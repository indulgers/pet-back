import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class LoginUserDto {
  // @IsNotEmpty({ message: '电话不能为空' })
  @IsString({ message: '电话号码格式不符合要求' })
  @Matches(/^[1][3,4,5,7,8,9][0-9]{9}$/, { message: '电话号码格式不符合要求' })
  mobile: string;

  // @IsNotEmpty({ message: '验证码不能为空' })
  @IsString({ message: '验证码格式不符合要求' })
  @Matches(/^\d{6}/, { message: '验证码格式不符合要求' })
  verifyCode: string;

  @IsString({ message: '密码格式不符合要求' })
  password: string;

  @IsString({ message: 'nickname格式不符合要求' })
  nickname: string;
}
