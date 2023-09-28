import { IsNotEmpty, IsEmail, MinLength, Matches } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string;

  @IsNotEmpty({ message: '昵称不能为空' })
  nickName: string;

  @IsNotEmpty({ message: '密码不能为空' })
  @MinLength(6, { message: '密码不能少于 6 位' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
    message: '密码格式不符合要求',
  })
  password: string;

  @IsNotEmpty({ message: '电话不能为空' })
  @Matches(/^[1][3,4,5,7,8,9][0-9]{9}$/, { message: '电话号码格式不符合要求' })
  phone: string;

  @IsNotEmpty({ message: '邮箱不能为空' })
  @IsEmail({}, { message: '不是合法的邮箱格式' })
  email: string;

  @IsNotEmpty({ message: '验证码不能为空' })
  @Matches(/^\d{6}/, { message: '验证码格式不符合要求' })
  verifyCode: string;
}
