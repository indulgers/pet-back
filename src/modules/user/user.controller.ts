import { RegisterUserDto } from './dto/register.dto';
import { LoginUserDto } from './dto/login.dto';
import {
  Controller,
  Post,
  Body,
  Inject,
  Req,
  Res,
  Get,
  Put,
  Delete,
  ValidationPipe,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  UnauthorizedException,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { ApiQuery, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { ListResult } from '@/interface';
import { ResultData } from '../../common/utils/result';
import { CreateTokenDto } from './dto/create-token.dto';
import { VerifyCodeData } from './dto/VerifyCodeDto.dto';
import { ApiResult } from '../../common/decorators/api-result.decorator';
import { AllowAnon } from '../../common/decorators/allow-anon.decorator';


@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Inject(JwtService)
  private jwtService: JwtService;
  private logger = new Logger();
  @Post('login')
  @ApiOperation({ summary: '登录' })
  @ApiResult(CreateTokenDto)
  async login(@Body() user: LoginUserDto): Promise<ResultData> {
    return await this.userService.login(user);
  }
  @Post('account')
  @ApiOperation({ summary: '账号密码登录' })
  @ApiResult(CreateTokenDto)
  async account(@Body() user: LoginUserDto): Promise<ResultData> {
    return await this.userService.passLogin(user);
  }

  @Post('register')
  @ApiOperation({ summary: '用户注册' })
  @ApiResult(RegisterUserDto)
  async register(@Body() registerUser: RegisterUserDto) {
    this.logger.log('registerUser', registerUser);
    return await this.userService.register(registerUser);
  }
  @Post('verify')
  @ApiOperation({ summary: '发送验证码' })
  @ApiResult(String)
  @ApiBody({ type: VerifyCodeData })
  async sendVerifyCode(@Body() verifyCodeData: VerifyCodeData) {
    try {
      //  调用服务层方法来发送验证码
      return await this.userService.sendVerificationCode(verifyCodeData.mobile); // 返回验证码或其他适当的响应
    } catch (error) {
      // 捕获异常并返回适当的错误响应
      throw new HttpException(
        '验证码发送失败',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('create')
  @ApiOperation({ summary: '创建用户' })
  @ApiResult(User)
  @ApiBody({ type: User })
  @ApiResponse({ status: 200, type: User })
  async create(@Body() user: User) {
    return await this.userService.create(user);
  }

  @Get('/')
  @ApiOperation({ summary: '获取用户列表' })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  @ApiResponse({ status: 200, type: ListResult<User> })
  async findAll(@Query('page') page: number, @Query('pageSize') pageSize: number) {
    return await this.userService.findAll(page, pageSize);
  }

  @Get('admin')
  @ApiOperation({ summary: '获取管理员列表' })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  @ApiResponse({ status: 200, type: ListResult<User> })
  async getAdminList(@Query('page') page: number, @Query('pageSize') pageSize: number) {
    return await this.userService.getAdminList(page, pageSize);
  }

  @Get('getUserInfo/:mobile')
  async getUserInfo(@Param('mobile') mobile: string) {
    const userInfo = await this.userService.getUserInfo(mobile);

    if (!userInfo) {
      return { message: '用户不存在' }; // 可以根据需要返回适当的响应
    }

    return userInfo; // 返回用户信息
  }

  @Get('info/:id')
  @ApiOperation({ summary: '获取用户信息' })
  async info(@Param('id') id: string) {
    return await this.userService.findUserById(id);
  }

  @Get('refresh/:refresh_token')
  async refresh(@Param('refresh_token') refresh_token: string) {
    this.logger.log('refreshToken', refresh_token);
    try {
      const data = this.jwtService.verify(refresh_token);

      this.logger.log('data', data);

      const user = await this.userService.findUserByMobile(data.mobile);

      const Token = this.userService.genToken({ mobile: user.mobile });

      this.logger.log('Token', Token);
      return {
        Token,
      };
    } catch (e) {
      throw new UnauthorizedException('token 已失效，请重新登录');
    }
  }
  @Put('update/:id')  // 更新用户
  @ApiOperation({ summary: '更新用户' })
  async update(@Param('id') id: string, @Body() user: User) {
    return await this.userService.update(id, user);
  }
  @Delete(':id')  // 删除用户
  @ApiOperation({ summary: '删除用户' })
  async remove(@Param('id') id: string, @Query('userId') userId: string) {
    return await this.userService.remove(id, userId);
  }
}
