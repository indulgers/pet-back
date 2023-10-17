import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateScriptTypeDto {
  @ApiProperty({ type: String, description: 'type_name' })
  @IsString()
  public type_name: string;
}
