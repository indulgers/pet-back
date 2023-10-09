import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateChapterDto {
  @ApiProperty({ description: '文案id' })
  @IsNotEmpty({ message: '文案id不能为空' })
  @IsString({ message: '文案id必须为字符串' })
  @MaxLength(64, { message: '文案id最长为64字符' })
  script_id: string;

  @ApiProperty({ description: '章节序号' })
  @IsInt({ message: '章节序号必须为整数' })
  @IsOptional()
  chapter_number?: number;

  @ApiProperty({ description: '章节名称' })
  @IsString({ message: '章节名称必须为字符串' })
  @IsOptional()
  @MaxLength(64, { message: '章节名称最长为64字符' })
  chapter_name?: string;

  @ApiProperty({ description: '章节角色' })
  @IsNotEmpty({ message: '章节角色不能为空' })
  @IsString({ message: '章节角色必须为字符串' })
  chapter_roles: string;

  @ApiProperty({ description: '章节内容' })
  @IsNotEmpty({ message: '章节内容不能为空' })
  @IsString({ message: '章节内容必须为字符串' })
  chapter_content: string;

  @ApiProperty({ description: '文案数据' })
  @IsNotEmpty({ message: '文案数据不能为空' })
  @IsString({ message: '文案数据必须为字符串' })
  script_data: string;

  @ApiProperty({ description: '章节状态' })
  @IsInt({ message: '章节状态必须为整数' })
  @IsOptional()
  status?: number;

  @ApiProperty({ description: '创建时间' })
  @IsOptional()
  create_time?: Date;

  @ApiProperty({ description: '更新时间' })
  @IsOptional()
  update_time?: Date;
}
