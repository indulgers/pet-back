import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { AppHttpCode } from './enums';

/**
 * 全局错误处理捕获
 */
@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  private logger = new Logger(CustomExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    this.logger.error(
      `Path: ${request.url}; Method: ${
        request.method
      }; Response: ${exception.toString()}`,
    );
    const status =
      exception.name === 'UnauthorizedException'
        ? AppHttpCode.UN_AUTH
        : AppHttpCode.FAIL;

    response.status(status).json({
      code: status,
      msg: exception.message,
    });
  }
}
