// multi-field-query.dto.ts
import { IsOptional, IsString } from 'class-validator';

export class MultiFieldQueryDto {
  @IsOptional()
  @IsString()
  script_name: string;

  @IsOptional()
  @IsString()
  nickname: string;

  // Add more fields as needed
}
