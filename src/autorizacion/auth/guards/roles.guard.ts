import { CanActivate, ExecutionContext, ForbiddenException, Injectable, mixin, Type, UnprocessableEntityException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from 'src/autorizacion/usuario/entities/usuario.entity';
import { Repository } from 'typeorm';
import { MessageEnum } from '../../../shared/enums/message.enum';
import { RolEnum } from '../../usuario/entities/rol.enum';
import { IS_PUBLIC_KEY } from '../decorators/auth-public.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectRepository(UsuarioEntity) private usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);

    if (isPublic) {
      return true;
    }
    const { user, method, route } = context.switchToHttp().getRequest(); //{ user, url, method, route, params, query }
    const path = route.path.split(':');
    const pathGral = path.length == 2 ? path[0].slice(0, -1) : path[0];
    const endPoint_ = `${pathGral}-${method}`;
    const result = await this.usuarioRepository
      .createQueryBuilder('u')
      .leftJoinAndSelect('usuarios_perfil', 'ur', 'ur.usuarioId = u.id')
      .leftJoinAndSelect('perfiles', 'r', 'r.id = ur.perfilId')
      //.leftJoinAndSelect('roles_permisos', 'rp', 'rp.perfilId = r.id')
      //.leftJoinAndSelect('permisos', 'p', 'p.id = rp.idPermiso')
      .where('u.id = :id', { id: user.id })
      // .andWhere('p.nombre like :per', { per: endPoint_ })
      // .andWhere('rp.habilitado = true AND rp.activo = true')
      .getCount()
      .catch(e => {
        throw new UnprocessableEntityException(e.message, MessageEnum.UNPROCESSABLE); // data : e.message
      });
    return result.valueOf() <= 0 ? false : true;
  }
}

export const RolesGuard = (...roles: RolEnum[]): Type<CanActivate> => {
  class RoleGuardMixin implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
      if (!roles) return true;

      const { user } = context.switchToHttp().getRequest();
      const isAllowed = roles.every(rol => user.roles.includes(rol));

      if (!isAllowed) throw new ForbiddenException({ message: MessageEnum.FORBIDDEN, data: null });
      return isAllowed;
    }
  }

  return mixin(RoleGuardMixin);
};
