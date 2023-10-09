// verify-code.dto.ts

import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyCodeData {
  @IsString()
  @IsNotEmpty()
  mobile: string;
}
