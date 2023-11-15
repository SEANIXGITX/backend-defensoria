import { ConflictException, HttpStatus, Injectable, Logger, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';

import { MessageResponse } from 'src/shared/entities/message-response';
import { MessageEnum } from 'src/shared/enums/message.enum';
import { CrearRolDto } from './dto/create-rol-dto';
import { RolEntity } from './entities/rol.entity';
import { RolMenuDto } from './dto/rol-menu.dto';
import { RolMenuEntity } from '../menu/entities/rol-menu.entity';
import { MenuEntity } from '../menu/entities/menu.entity';
@Injectable()
export class RolService {
  private readonly logger = new Logger(RolService.name);
  constructor(
    @InjectRepository(RolEntity) private rolRepository: Repository<RolEntity>,
    @InjectRepository(RolMenuEntity) private rolMenuRepository: Repository<RolMenuEntity>,
    @InjectRepository(MenuEntity) private menuRepository: Repository<MenuEntity>,
  ) {}
  /*
  async obtenerRolesPorIds(rolesIds: Array<number>):Promise<RolDto[]>
     .findBy({ id: In([1, 2, 3]) })
    const roles: Array<RolDto> = await this.rolRepository.findByIds(
      {id: In([rolesIds])},
      { order: { id: 'ASC' } }
    );
    return roles;
    return [1, 2, 3];
  }
 */
  async createRol(rolNuevo: CrearRolDto): Promise<MessageResponse<RolEntity>> {
    const existe = await this.rolRepository.findOne({
      where: [{ codigo: rolNuevo.codigo, activo: true }],
    });
    if (existe) throw new ConflictException({ message: MessageEnum.EXIST, data: null });

    const nuevo_ = new RolEntity();
    Object.assign(nuevo_, rolNuevo);
    nuevo_.habilitado = true;

    await this.rolRepository.save(nuevo_).catch(e => {
      throw new UnprocessableEntityException(e.message, MessageEnum.ERROR_CREATE);
    });
    return new MessageResponse(HttpStatus.CREATED, MessageEnum.CREATED, nuevo_);
  }

  async updateRol(id: number, rolActualizar: CrearRolDto): Promise<MessageResponse<RolEntity[] | RolEntity>> {
    let rolUpdate = await this.rolRepository.findOne({ where: { id: id } });
    if (!rolUpdate) {
      throw new NotFoundException({ message: MessageEnum.NOT_EXIST, data: null });
    }

    rolUpdate = this.rolRepository.create(rolActualizar);
    const existe = await this.rolRepository.find({
      where: [{ id: Not(id), codigo: rolUpdate.codigo, activo: true }],
    });
    if (existe.length) throw new ConflictException({ message: MessageEnum.EXIST, data: existe });

    await this.rolRepository.update(id, rolUpdate).catch(e => {
      throw new UnprocessableEntityException(e.message, MessageEnum.ERROR_UPDATE);
    });
    const listar = await this.rolRepository.findOne({ where: { id } });
    return new MessageResponse(HttpStatus.OK, MessageEnum.UPDATED, listar);
  }

  async obtenerRoles(): Promise<MessageResponse<RolEntity[]>> {
    const roles = await this.rolRepository
      .createQueryBuilder('rol')
      .leftJoinAndSelect('rol.menusRol', 'menusRol', 'rol.id = menusRol.perfilId and menusRol.habilitado = true')
      .leftJoinAndSelect('rol.usuariosRol', 'usuariosRol', 'rol.id = usuariosRol.perfilId and usuariosRol.habilitado = true')
      .addSelect(['rol.usuarioCreacion', 'rol.fechaCreacion', 'rol.usuarioModificacion', 'rol.fechaModificacion'])
      .getMany();

    return new MessageResponse(HttpStatus.OK, MessageEnum.ENTITY_SELECT, roles);
  }

  async nivelRoles(nivel: number): Promise<MessageResponse<any[]>> {
    const roles = await this.rolRepository.findBy({ categoriaId: nivel, habilitado: true, activo: true }).catch(e => {
      throw new UnprocessableEntityException(e.message, MessageEnum.BAD_REQUEST); // data: e.message
    });
    if (roles.length < 1) {
      return new MessageResponse(HttpStatus.OK, MessageEnum.ENTITY_SELECT_EMPTY, null);
    }
    let rolesVector = [];
    roles.forEach(rol => rolesVector.push(rol.id));
    rolesVector = rolesVector.sort();
    return new MessageResponse(HttpStatus.OK, MessageEnum.ENTITY_SELECT, rolesVector);
  }

  async eliminar(id: number): Promise<MessageResponse<{ id: number }>> {
    const rol = await this.rolRepository.findOne({ where: { id } });
    if (!rol) {
      throw new NotFoundException({ message: MessageEnum.NOT_EXIST, data: null });
    }
    await this.rolRepository.update(id, { activo: false }).catch(e => {
      throw new UnprocessableEntityException(e.message, MessageEnum.ERROR_DELETE);
    });
    return new MessageResponse(HttpStatus.OK, MessageEnum.DELETED, { id });
  }

  async enable(id: number): Promise<MessageResponse<{ id: number; habilitado: boolean }>> {
    const rol = await this.rolRepository.findOne({ where: { id, activo: true } });
    if (!rol) throw new NotFoundException({ message: MessageEnum.NOT_EXIST, data: null });

    rol.habilitado = !rol.habilitado;
    await this.rolRepository.update(id, { habilitado: rol.habilitado }).catch(e => {
      throw new UnprocessableEntityException(e.message, MessageEnum.ERROR_UPDATE);
    });

    return new MessageResponse(HttpStatus.OK, MessageEnum.ENABLED, { id: rol.id, habilitado: rol.habilitado });
  }

  async agregarOQuitarMenu(idRol: number, rolMenuDto: RolMenuDto): Promise<MessageResponse<{ id: number; habilitado: boolean }>> {
    const rol = await this.rolRepository.findOne({ where: { id: idRol, activo: true } });
    if (!rol) throw new NotFoundException({ message: MessageEnum.NOT_EXIST_ROL, data: null });

    const menu = await this.menuRepository.findOne({ where: { id: rolMenuDto.menuId, activo: true } });
    if (!menu) throw new NotFoundException({ message: MessageEnum.NOT_EXIST_MENU, data: null });

    let rolMenu;

    if (rolMenuDto?.id) {
      rolMenu = await this.rolMenuRepository.findOne({ where: { id: rolMenuDto.id, activo: true }, order: { fechaCreacion: 'DESC' } });
    } else {
      rolMenu = await this.rolMenuRepository.findOne({
        where: { perfilId: idRol, menuId: rolMenuDto.menuId, activo: true },
        order: { fechaCreacion: 'DESC' },
      });
    }

    await this.rolMenuRepository.save({
      id: rolMenu?.id,
      perfilId: idRol,
      menuId: rolMenuDto.menuId,
      habilitado: !rolMenu?.habilitado,
    });

    return new MessageResponse(HttpStatus.ACCEPTED);
  }
}
