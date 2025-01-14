import { IsNotEmpty, IsEmail, MinLength, Matches } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty({ message: '昵称不能为空' })
  nickname: string;

  @IsNotEmpty({ message: '电话不能为空' })
  @Matches(/^[1][3,4,5,7,8,9][0-9]{9}$/, { message: '电话号码格式不符合要求' })
  mobile: string;

  @IsNotEmpty({ message: '验证码不能为空' })
  @Matches(/^\d{6}/, { message: '验证码格式不符合要求' })
  verifyCode: string;
}
