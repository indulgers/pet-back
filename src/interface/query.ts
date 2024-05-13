import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNumber,
  IsNumberString,
  IsOptional,
  Max,
  Min,
} from 'class-validator';

export interface CommonQuery {
  id?: string;
  page?: number;
  pageSize?: number;
}

export class CommonQueryDto {
  @ApiProperty({
    type: String,
    description: 'id',
    required: false,
  })
  @IsNumberString()
  @IsOptional()
  id?: string;

  @ApiProperty({
    type: Number,
    description: '页数默认为 1',
    required: false,
  })
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  @IsOptional()
  page?: number = 1;

  @ApiProperty({
    type: Number,
    description: '每页数量，默认为 20',
    required: false,
  })
  @IsNumber()
  @Max(100000)
  @Type(() => Number)
  @IsOptional()
  pageSize?: number = 20;
}

export interface ImageInfoQuery extends CommonQuery {
  imageId?: string;
  projectId?: string;
}

export interface CommentQuery extends CommonQuery {
  artifactId?: string;
  projectId?: string;
  replyId?: string;
  rootId?: string;
}
