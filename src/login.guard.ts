import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { Observable } from 'rxjs';
import { isTokenExpired } from './common/utils/validate';
import { JwtService } from '@nestjs/jwt';
import axios, { AxiosResponse } from 'axios';
import { Logger } from '@nestjs/common'; // 修改此行

@Injectable()
export class LoginGuard implements CanActivate {
  @Inject(JwtService)
  private jwtService: JwtService;

  private logger = new Logger(); // 修改此行
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const authorization = request.header('Authorization') || '';

    try {
      // 验证 Token
      const token = authorization.split(' ')[1];
      const info = this.jwtService.verify(token);
      (request as any).user = info.user;

      // 检查 Token 是否即将过期
      // if (isTokenExpired(token)) {
      //   // 如果即将过期，尝试刷新 Token
      //   return this.refreshToken(info.refreshToken).then((newTokenResponse) => {
      //     if (newTokenResponse.status === 200) {
      //       const newTokenData = newTokenResponse.data as any;
      //       request.headers.authorization = `Bearer ${newTokenData.access_token}`;
      //     }
      //     return true;
      //   });
      // }

      return true;
    } catch (e) {
      throw new UnauthorizedException('登录 token 失效，请重新登录');
    }
  }

  // 刷新 Token 的逻辑
  // private refreshToken(refreshToken: string): Promise<AxiosResponse<any>> {
  //   try {
  //     return axios(`/refresh/${refreshToken}`, {
  //       method: 'GET',
  //       // 在这里可以配置请求头等信息
  //     });
  //   } catch (error) {
  //     // 处理刷新 Token 失败的情况
  //     console.error('Failed to refresh token:', error);
  //
  //     // 在这里可以执行其他操作，例如跳转到登录页面或弹出提示框
  //     throw new UnauthorizedException('刷新 token 失败，请重新登录');
  //   }
  // }
}
