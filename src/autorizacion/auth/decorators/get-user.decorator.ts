import { UsuarioEntity } from '../../usuario/entities/usuario.entity';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator((data, ctx: ExecutionContext): UsuarioEntity => {
  const req = ctx.switchToHttp().getRequest();
  return req.user;
});
