// verify-code.dto.ts

import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyCodeData {
  @IsString()
  @IsNotEmpty()
  mobile: string;
}
export class RefreshTokenData {
  @IsString()
  @IsNotEmpty()
  refresh_token: string;
}
