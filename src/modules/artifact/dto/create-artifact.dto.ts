import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt, IsOptional, MaxLength } from 'class-validator';
import { DeepPartial } from 'typeorm';
import { Project } from "../../project/entities/project.entity";
import { Chapter } from "../../chapter/entities/chapter.entity";
import { Script } from "../../script/entities/script.entity";
import { User } from "../../user/entities/user.entity";

export class CreateArtifactDto {
  @ApiProperty({ type: String, description: '流程id' })
  @IsNotEmpty({ message: '流程id不能为空' })
  @IsString({ message: '流程id必须为字符串' })
  flow_id: string;

  @ApiProperty({ type: String, description: '用户id' })
  @IsNotEmpty({ message: '用户id不能为空' })
  @IsString({ message: '用户id必须为字符串' })
  user_id: string;

  @ApiProperty({ type: String, description: '文案id' })
  @IsNotEmpty({ message: '文案id不能为空' })
  @IsString({ message: '文案id必须为字符串' })
  script_id: string;

  @ApiProperty({ type: String, description: '章节id' })
  @IsNotEmpty({ message: '章节id不能为空' })
  @IsString({ message: '章节id必须为字符串' })
  chapter_id: string;

  @ApiProperty({ type: String, description: '项目id' })
  @IsNotEmpty({ message: '项目id不能为空' })
  @IsString({ message: '项目id必须为字符串' })
  project_id: string;

  @ApiProperty({ type: Number, description: '章节序号' })
  @IsNotEmpty({ message: '章节序号不能为空' })
  @IsInt({ message: '章节序号必须为整数' })
  chapter_number: number;

  @ApiProperty({ type: String, description: '样式' })
  @IsOptional()
  @IsString({ message: '样式必须为字符串' })
  style?: string;

  @ApiProperty({ type: Number, description: '总体状态' })
  @IsNotEmpty({ message: '总体状态不能为空' })
  @IsInt({ message: '总体状态必须为整数' })
  overall_status: number;

  @ApiProperty({ type: Number, description: '选图状态' })
  @IsNotEmpty({ message: '选图状态不能为空' })
  @IsInt({ message: '选图状态必须为整数' })
  selection_status: number;

  @ApiProperty({ type: String, description: '已选图片信息' })
  @IsOptional()
  @IsString({ message: '已选图片信息必须为字符串' })
  selected_imgs?: string;

  @ApiProperty({ type: String, description: '已保存图片信息' })
  @IsOptional()
  @IsString({ message: '已保存图片信息必须为字符串' })
  saved_imgs?: string;

  @ApiProperty({ type: String, description: '图片信息' })
  @IsOptional()
  @IsString({ message: '图片信息必须为字符串' })
  imgs_info?: string;

  @ApiProperty({ type: Number, description: '发布状态' })
  @IsOptional()
  @IsInt({ message: '发布状态必须为整数' })
  publish_status?: number;


}
