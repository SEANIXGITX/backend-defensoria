import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { MessageEnum } from '../../../shared/enums/message.enum';
import { IS_PUBLIC_KEY } from '../decorators/auth-public.decorator';
import { GlobalService } from '../global.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);

    if (isPublic) return true;

    return super.canActivate(context);
  }

  handleRequest(err, user, info, context: ExecutionContext) {
    if (err || !user) {
      throw err || new UnauthorizedException({ message: MessageEnum.UNAUTHORIZED, data: null });
    }

    GlobalService.userNameSession = user.usuario;

    return user;
  }
}
