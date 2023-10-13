import { IsString, IsNotEmpty, IsInt } from 'class-validator';

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
}
