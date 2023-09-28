import { LoginUserDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register.dto';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as crypto from 'crypto';
import { ResultData } from '../common/utils/result';
import { AppHttpCode } from '../common/enums/code.enum';
import { genSalt } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { instanceToPlain } from 'class-transformer';
import { RedisService } from '../redis/redis.service';
function md5(str) {
  const hash = crypto.createHash('md5');
  hash.update(str);
  return hash.digest('hex');
}

@Injectable()
export class UserService {
  private logger = new Logger();

  @InjectRepository(User)
  private userRepository: Repository<User>;

  @Inject(RedisService)
  private redisService: RedisService;

  @Inject(JwtService)
  private readonly jwtService: JwtService;

  private readonly phoneNumberRegex = /^1[3456789]\d{9}$/;
  // 模拟存储验证码的对象，实际应该存储在数据库或缓存中
  private verificationCodes: { [phone: string]: string } = {};
  async sendVerificationCode(phone: string): Promise<ResultData> {
    // 生成随机的六位验证码

    if (!this.isPhoneNumberValid(phone))
      return ResultData.fail(
        AppHttpCode.USER_PHONE_NOT_FOUND,
        '非法的手机号格式',
      );
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // 模拟发送验证码的操作，这里只是输出到控制台
    console.log(`Sending verification code ${code} to ${phone}`);
    await this.redisService.set(`verifyCode_${phone}`, code, 5 * 60);

    // 存储验证码，以便后续验证
    this.verificationCodes[phone] = code;

    // 返回生成的验证码
    return ResultData.ok(code);
  }

  async verifyCode(phone: string, code: string): Promise<boolean> {
    const storedCode = this.verificationCodes[phone];

    // 检查是否有存储的验证码，并且匹配用户输入的验证码
    return storedCode && storedCode === code;
  }

  async login(user: LoginUserDto): Promise<ResultData> {
    const foundUser = await this.userRepository.findOneBy({
      phone: user.phone,
    });

    if (!foundUser) {
      return ResultData.fail(
        AppHttpCode.USER_PHONE_NOT_FOUND,
        '用户手机号不存在',
      );
    }
    //verifyCode wrong
    if (!(await this.verifyCode(user.phone, user.verifyCode))) {
      return ResultData.fail(AppHttpCode.USER_VERIFY_CODE_ERROR, '验证码错误');
    }

    // 生成 token
    const data = this.genToken({ phone: user.phone });
    this.logger.log(data);
    return ResultData.ok(data);
  }

  async register(user: RegisterUserDto): Promise<ResultData> {
    const verifyCode = await this.redisService.get(`verifyCode_${user.phone}`);
    const salt = await genSalt();
    if (!verifyCode) {
      return ResultData.fail(
        AppHttpCode.USER_VERIFY_CODE_INVALID,
        '验证码已失效',
      );
    }

    if (user.verifyCode !== verifyCode) {
      return ResultData.fail(AppHttpCode.USER_VERIFY_CODE_ERROR, '验证码错误');
    }

    const foundUser = await this.userRepository.findOneBy({
      phone: user.phone,
    });

    if (foundUser) {
      return ResultData.fail(AppHttpCode.USER_CREATE_EXISTING, '用户已存在');
    }

    const newUser = new User();
    newUser.username = user.username;
    newUser.password = md5(user.password);
    newUser.email = user.email;
    newUser.phone = user.phone;
    newUser.salt = salt;
    this.logger.log(newUser.username);
    try {
      await this.userRepository.save(newUser);
      return ResultData.ok(instanceToPlain(newUser));
    } catch (e) {
      this.logger.error(e, UserService);
      return ResultData.fail(AppHttpCode.USER_REGISTER_FAIL, '注册失败');
    }
  }

  genToken(payload: { phone: string }): {
    Token: string;
  } {
    const Token = this.jwtService.sign(payload, { expiresIn: '30m' });
    this.logger.log(Token);
    // const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
    // this.logger.log(refreshToken);
    return { Token };
  }

  //校验手机号格式
  isPhoneNumberValid(phoneNumber: string): boolean {
    return this.phoneNumberRegex.test(phoneNumber);
  }
  /**
   * 生成刷新 token
   */
}
