import { IsString, IsNotEmpty, IsInt } from 'class-validator';
import { DeepPartial } from 'typeorm';
import { Script } from '../../script/entities/script.entity';
import { User } from '../../user/entities/user.entity';

export class CreateProjectDto {
  @IsString()
  public user_id: string;

  @IsString()
  public style: string;

  @IsString()
  public roles_info: string;

  @IsString()
  public cover_url: string;

  @IsInt()
  public status: number;

  @IsInt()
  public access_control: number;

  script: DeepPartial<Script>;

  user: DeepPartial<User>;
}
