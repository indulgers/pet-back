import { Request } from 'express';
import { Observable } from 'rxjs';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissionMetaData, UserPermission, isAdmin } from '@/common';
import { TokenUser } from './interface';

declare module 'express' {
  interface Request {
    user: TokenUser;
  }
}

@Injectable()
export class PermissionGuard implements CanActivate {
  logger: Logger = new Logger();
  @Inject()
  private reflector: Reflector;
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const permission = this.reflector.getAllAndOverride(PermissionMetaData, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!permission) {
      return true;
    }

    const authorization = request.header('authorization') || '';
    const bearer = authorization.split(' ');
    const isThrowErr = permission !== UserPermission.Parse;

    if (!bearer || bearer.length < 2) {
      if (isThrowErr) {
        throw new UnauthorizedException('未登录或登录 token 错误');
      }
      return true;
    }

    const token = bearer[1];

    try {
      // request.user = authSdk.parseJwtToken(token) as unknown as TokenUser;
      if (permission === UserPermission.Admin && !isAdmin(request.user)) {
        throw new UnauthorizedException('没有权限');
      }
      return true;
    } catch (error) {
      if (!isThrowErr) return true;
      // 根据不同的错误情况抛出自定义错误
      if (error.name === 'UnauthorizedException') {
        throw error;
      } else {
        throw new UnauthorizedException('登录 token 失效，请重新登录');
      }
    }
  }
}
