import { LoginUserDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register.dto';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { ResultData } from '../../common/utils/result';
import { AppHttpCode } from '../../common/enums/code.enum';
import { JwtService } from '@nestjs/jwt';

import { RedisService } from '../../redis/redis.service';
import { guid } from '../../common/utils/utils';
import { Operation } from '../operation/entities/operation.entity';
import { validPhone } from '../../common/utils/validate';
import { RedisService as RedisTokenService } from 'nestjs-redis';
@Injectable()
export class UserService {
  private logger = new Logger();

  @InjectRepository(User)
  private userRepository: Repository<User>;

  @InjectRepository(Operation)
  private operationRepository: Repository<Operation>;

  @Inject(RedisService)
  private redisService: RedisService;

  private readonly redisTokenService: RedisTokenService;

  @Inject(JwtService)
  private readonly jwtService: JwtService;
  // 模拟存储验证码的对象，实际存储在数据库或缓存中
  private verificationCodes: { [mobile: string]: string } = {};
  async sendVerificationCode(mobile: string): Promise<ResultData> {
    // 生成随机的六位验证码

    if (!validPhone(mobile))
      return ResultData.fail(AppHttpCode.FAIL, '非法的手机号格式');
    const code = Math.floor(1000 + Math.random() * 9000).toString();

    // 模拟发送验证码的操作，这里只是输出到控制台
    console.log(`Sending verification code ${code} to ${mobile}`);
    await this.redisService.set(`verifyCode_${mobile}`, code, 5 * 60);

    // 存储验证码，以便后续验证
    this.verificationCodes[mobile] = code;

    // 返回生成的验证码
    return ResultData.ok(code);
  }

  // 验证用户输入的验证码是否与存储的验证码匹配
  async verifyCode(mobile: string, code: string): Promise<boolean> {
    const storedCode = this.verificationCodes[mobile];

    // 检查是否有存储的验证码，并且匹配用户输入的验证码
    return storedCode && storedCode === code;
  }
  async passLogin(user: LoginUserDto): Promise<ResultData> {
    const foundUser = await this.userRepository.findOneBy({
      nickname: user.nickname,
      password: user.password,
    });

    if (!foundUser) {
      return ResultData.fail(AppHttpCode.FAIL, '用户手机号或密码错误');
    }
    // 生成 token
    const data = this.genToken({ mobile: user.mobile, user_id: foundUser.id });
    this.logger.log(data);
    return ResultData.ok(data);
  }

  async create(user: User): Promise<ResultData> {
    const newUser = this.userRepository.create(user);
    newUser.id = guid();
    await this.userRepository.save(newUser);
    return ResultData.ok(newUser);
  }

  async findAll(page = 1, pageSize = 10): Promise<ResultData<User[]>> {
    const users = await this.userRepository.find({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    return ResultData.ok(users);
  }

  async getAdminList(page = 1, pageSize = 10): Promise<ResultData<User[]>> {
    const users = await this.userRepository.find({
      skip: (page - 1) * pageSize,
      take: pageSize,
      where: { role: In([1, 2]) },
    });
    return ResultData.ok(users);
  }
  // 用户登录函数
  async login(user: LoginUserDto): Promise<ResultData> {
    const foundUser = await this.userRepository.findOneBy({
      mobile: user.mobile,
    });

    if (!foundUser) {
      return ResultData.fail(AppHttpCode.FAIL, '用户手机号不存在');
    }
    // 验证验证码是否正确
    if (!(await this.verifyCode(user.mobile, user.verifyCode))) {
      return ResultData.fail(AppHttpCode.FAIL, '验证码错误');
    }

    // 生成 token
    const data = this.genToken({ mobile: user.mobile, user_id: foundUser.id });
    this.logger.log(data);
    return ResultData.ok(data);
  }

  // 用户注册函数
  async register(user: RegisterUserDto): Promise<ResultData> {
    const verifyCode = await this.redisService.get(`verifyCode_${user.mobile}`);
    if (!verifyCode) {
      return ResultData.fail(AppHttpCode.FAIL, '验证码已失效');
    }

    if (user.verifyCode !== verifyCode) {
      return ResultData.fail(AppHttpCode.FAIL, '验证码错误');
    }

    const foundUser = await this.userRepository.findOneBy({
      mobile: user.mobile,
    });

    if (foundUser) {
      return ResultData.fail(AppHttpCode.FAIL, '用户已存在');
    }

    const newUser = new User();
    newUser.nickname = user.nickname;
    newUser.mobile = user.mobile;
    newUser.id = guid();
    this.logger.log(newUser.nickname);
    try {
      await this.userRepository.save(newUser);
      return ResultData.ok(newUser);
    } catch (e) {
      this.logger.error(e, UserService);
      return ResultData.fail(AppHttpCode.FAIL, '注册失败');
    }
  }

  genToken(payload: { mobile?: string; user_id?: string }): {
    access_token: string;
    refresh_token: string;
  } {
    const accessPayload = { ...payload, tokenType: 'access' };
    const refreshPayload = { ...payload, tokenType: 'refresh' };
    const access_token = this.jwtService.sign(accessPayload, {
      expiresIn: '30m',
    });
    const refresh_token = this.jwtService.sign(refreshPayload, {
      expiresIn: '30d',
    });
    this.logger.log(access_token, refresh_token);
    return { access_token, refresh_token, ...payload };
  }

  async getUserInfo(
    mobile?: string,
    id?: string,
  ): Promise<ResultData<User | null>> {
    let foundUser: User | null = null;
    // 在数据库中查找用户，可以使用 userRepository 或者其他相关的方法
    if (id) {
      foundUser = await this.findUserById(id);
    }
    if (mobile) {
      foundUser = await this.findUserByMobile(mobile);
    }
    if (!foundUser) {
      return null; // 如果用户不存在，返回 null
    }
    // 如果用户存在，可以在这里处理返回的用户信息，例如过滤敏感信息等
    return ResultData.ok(foundUser);
  }
  async findUserById(id: string): Promise<User | null> {
    // 在数据库中查找用户，使用用户的 ID 进行查询
    const foundUser = await this.userRepository.findOne({
      where: [{ id }], // 将查询条件包装在数组中
    });

    if (!foundUser) {
      return null; // 如果用户不存在，返回 null
    }

    // 如果用户存在，可以在这里处理返回的用户信息，例如过滤敏感信息等
    return foundUser;
  }
  async findUserByMobile(mobile: string): Promise<User | null> {
    // 在数据库中查找用户，使用用户的 ID 进行查询
    const foundUser = await this.userRepository.findOne({
      where: [{ mobile }], // 将查询条件包装在数组中
    });

    if (!foundUser) {
      return null; // 如果用户不存在，返回 null
    }

    // 如果用户存在，可以在这里处理返回的用户信息，例如过滤敏感信息等
    return foundUser;
  }

  async update(id: string, user: User): Promise<ResultData> {
    const foundUser = await this.userRepository.findOne({ where: { id } });
    if (!foundUser) {
      return ResultData.fail(AppHttpCode.FAIL, '用户不存在');
    }
    await this.userRepository.update(id, user);
    return ResultData.ok();
  }
  async remove(id: string, userId?: string): Promise<ResultData> {
    const foundUser = await this.userRepository.findOne({ where: { id } });
    if (!foundUser) {
      return ResultData.fail(AppHttpCode.FAIL, '用户不存在');
    }

    foundUser.status = -1; // 将用户状态置为 -1 代表删除
    const [updatedUser, operation] = await Promise.all([
      this.userRepository.save(foundUser),
      this.operationRepository.create({
        id: guid(),
        mode: 'delete',
        model: 'user',
        user_id: userId,
      }),
    ]);
    await this.operationRepository.save(operation);
    return ResultData.ok();
  }
}
