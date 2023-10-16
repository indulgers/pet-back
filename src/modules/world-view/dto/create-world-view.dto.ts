import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  IsUrl,
} from 'class-validator';
import { DeepPartial } from 'typeorm';
import { Script } from '../../script/entities/script.entity';

export class CreateWorldViewDto {
  @ApiProperty({ type: Number, description: '状态' })
  @IsNumber()
  @IsNotEmpty({ message: '状态不能为空' })
  status: number;

  @ApiProperty({ type: String, description: '类型' })
  @IsString({ message: '类型必须为字符串' })
  @IsNotEmpty({ message: '类型不能为空' })
  type: string;

  @ApiProperty({ type: String, description: '实体id' })
  @IsString({ message: '实体id必须为字符串' })
  @IsNotEmpty({ message: '实体id不能为空' })
  entity_id: string;

  @ApiProperty({ type: String, description: '实体名称' })
  @IsString({ message: '实体名称必须为字符串' })
  @IsOptional()
  entity_name?: string;

  @ApiProperty({ type: String, description: '实体描述' })
  @IsString({ message: '实体描述必须为字符串' })
  @IsOptional()
  entity_desc?: string;

  @ApiProperty({ type: String, description: '演示地址' })
  @IsUrl({}, { message: '演示地址必须是有效的URL' })
  @IsOptional()
  demo_url?: string;

  @ApiProperty({ type: String, description: 'Lora ID' })
  @IsString({ message: 'Lora ID必须为字符串' })
  @IsOptional()
  lora_id?: string;

  script: DeepPartial<Script>;
}
