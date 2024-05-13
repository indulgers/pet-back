import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { AppHttpCode } from './enums';

/**
 * 自定义验证管道，用于返回更友好的错误信息
 */
export class CustomValidationPipe extends ValidationPipe {
  constructor() {
    super({
      exceptionFactory: (errors) => {
        const messages = errors.map(
          (error) => `${Object.values(error.constraints).join(', ')}`,
        );
        return new BadRequestException({
          statusCode: AppHttpCode.VALIDATION_ERROR,
          message: messages.join(';'),
        });
      },
    });
  }
}
