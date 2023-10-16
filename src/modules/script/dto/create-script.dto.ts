import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { DeepPartial } from 'typeorm';
import { User } from '../../user/entities/user.entity';

export class CreateScriptDto {
  @ApiProperty({ description: '文案名称' })
  @IsNotEmpty({ message: '文案名称不能为空' })
  @IsString({ message: '文案名称必须为字符串' })
  script_name: string;

  @ApiProperty({ description: '文案URL' })
  @IsNotEmpty({ message: '文案URL不能为空' })
  @IsUrl({}, { message: '文案URL必须是有效的URL' })
  script_url: string;

  @ApiProperty({ description: '版权信息' })
  @IsOptional()
  @IsString({ message: '版权信息必须为字符串' })
  copyright_info?: string;

  @ApiProperty({ description: '封面URL' })
  @IsOptional()
  @IsUrl({}, { message: '封面URL必须是有效的URL' })
  cover_url?: string;

  @ApiProperty({ description: '文案类型' })
  @IsOptional()
  @IsString({ message: '文案类型必须为字符串' })
  type?: string;

  @ApiProperty({ description: '文案全文' })
  @IsOptional()
  @IsString({ message: '文案全文必须为字符串' })
  full_text?: string;

  @ApiProperty({ description: '文案摘要' })
  @IsOptional()
  @IsString({ message: '文案摘要必须为字符串' })
  summary?: string;

  @ApiProperty({ description: '上传类型' })
  @IsOptional()
  @IsInt({ message: '上传类型必须为整数' })
  upload_type?: number;

  @ApiProperty({ description: '文案状态' })
  @IsOptional()
  @IsInt({ message: '文案状态必须为整数' })
  status?: number;

  @ApiProperty({ description: '访问控制' })
  @IsOptional()
  @IsInt({ message: '访问控制必须为整数' })
  access_control?: number;

  user: DeepPartial<User>;
}
