// multi-field-query.dto.ts
import { IsOptional, IsString } from 'class-validator';

export class MultiFieldQueryDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @IsString()
  user_id?: string;

  @IsOptional()
  @IsString()
  script_id?: string;

  @IsOptional()
  @IsString()
  script_name?: string;

  @IsOptional()
  @IsString()
  nickname?: string;

  @IsOptional()
  @IsString()
  copyright_info?: string;

  @IsOptional()
  @IsString()
  cover_url?: string;

  @IsOptional()
  @IsString()
  script_url?: string;

  @IsOptional()
  @IsString()
  full_text?: string;

  @IsOptional()
  @IsString()
  summary?: string;
  // Add more fields as needed
}
