import { UsuarioEntity } from '../../usuario/entities/usuario.entity'; //'@app/usuario/entities/usuario.entity';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_TOKEN,
      //ignoreExpiration: false,
      //passReqToCallback: false,
    });
  }

  async validate(payload: JwtPayload): Promise<UsuarioEntity> {
    return this.authService.verifyPayload(payload);
  }
}
