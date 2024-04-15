import { AppHttpCode } from '../enums/code.enum';
import { ApiProperty } from '@nestjs/swagger';

export class ResultData<T = unknown> {
  constructor(code: AppHttpCode = AppHttpCode.SUCCESS, msg?: string, data?: T) {
    this.code = code;
    this.msg = msg || 'ok';
    this.data = data || null;
  }

  @ApiProperty({ type: 'number', default: 200 })
  code: number;

  @ApiProperty({ type: 'string', default: 'ok' })
  msg?: string;

  data?: T;

  isOk() {
    return this.code === AppHttpCode.SUCCESS;
  }

  static ok<T = unknown>(data?: T, msg?: string): ResultData<T> {
    return new ResultData(AppHttpCode.SUCCESS, msg, data);
  }

  static fail<T = unknown>(
    code: number,
    msg?: string,
    data?: T,
  ): ResultData<T> {
    return new ResultData(code || AppHttpCode.FAIL, msg || 'fail', data);
  }
  static error<T = unknown>(msg?: string, data?: T): ResultData<T> {
    return new ResultData(AppHttpCode.ERROR, msg || 'error', data);
  }

  // 无权限
  static noAccess<T = unknown>(msg?: string, data?: T): ResultData<T> {
    return new ResultData(AppHttpCode.NO_ACCESS, msg || '无权限', data);
  }
}
