import { MessageEnum } from '../../../shared/enums/message.enum'; //'@app/shared/enums/message.enum';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { AuthLoginDto } from '../dto/auth-login.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'usuario',
      passwordField: 'clave',
      passReqToCallback: false,
    });
  }

  async validate(usuario: string, clave: string): Promise<any> {
    const authLoginDto: AuthLoginDto = { usuario, clave };
    const user = await this.authService.validateUser(authLoginDto);
    if (!user) {
      throw new UnauthorizedException(`${MessageEnum.UNAUTHORIZED} (local)`);
    }
    return user;
  }
}
