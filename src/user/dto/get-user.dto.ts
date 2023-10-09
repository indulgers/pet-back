import { IsString } from 'class-validator';

export class UserDto {
  @IsString()
  public id: number;

  @IsString()
  public userId: string;

  @IsString()
  public mobile: string;

  @IsString()
  public nickname: string;
}
