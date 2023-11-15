import { MessageEnum } from '../../../shared/enums/message.enum';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  handleRequest(err, user) {
    if (err || !user) {
      throw err || new UnauthorizedException({ message: MessageEnum.UNAUTHORIZED, data: null });
    }
    return user;
  }
}
