import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { MessageEnum } from '../../../shared/enums/message.enum';

@Injectable()
export class JwtRefreshTokenGuard extends AuthGuard('jwt-refresh-token') {
  constructor(private reflector: Reflector) {
    super();
  }
  /*
  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }*/

  handleRequest(err, user) {
    if (err || !user) {
      throw err || new UnauthorizedException({ message: MessageEnum.UNAUTHORIZED, data: null });
    }
    return user;
  }
}
