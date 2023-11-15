import { ConflictException, HttpStatus, Injectable, Logger, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MessageResponse } from 'src/shared/entities/message-response';
import { Message, MessageEnum } from 'src/shared/enums/message.enum';
import { UsuarioEntity } from '../usuario/entities/usuario.entity';
import { CreateUsuarioRolDto } from './dto/create-usuario-rol-dto';
import { RolEntity } from './entities/rol.entity';
import { UsuarioRolEntity } from './entities/usuario-rol.entity';

@Injectable()
export class UsuarioRolService {
  private readonly logger = new Logger(UsuarioRolService.name);
  constructor(
    @InjectRepository(UsuarioRolEntity) private usuarioRolRepository: Repository<UsuarioRolEntity>,
    @InjectRepository(RolEntity) private rolRepository: Repository<RolEntity>,
    @InjectRepository(UsuarioEntity) private usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async crearRolUsuario(usuarioRolNuevo: CreateUsuarioRolDto): Promise<MessageResponse<UsuarioRolEntity>> {
    const existeRol = await this.rolRepository.findOneBy({ id: usuarioRolNuevo.perfilId, habilitado: true });
    if (!existeRol) throw new NotFoundException({ message: Message.notExists('Rol', usuarioRolNuevo.perfilId), data: null });
    // se debe verificar en tthh
    const existeUsuario = await this.usuarioRepository.findOneBy({ id: usuarioRolNuevo.usuarioId, habilitado: true });
    if (!existeUsuario) throw new NotFoundException({ message: Message.notExists('Usuario', usuarioRolNuevo.usuarioId), data: null });

    const existe = await this.usuarioRolRepository.findOneBy({
      usuarioId: usuarioRolNuevo.usuarioId,
      perfilId: usuarioRolNuevo.perfilId,
      habilitado: true,
    });
    if (existe) throw new ConflictException({ message: MessageEnum.EXIST, data: existe });

    const nuevo = this.usuarioRolRepository.create(usuarioRolNuevo);
    nuevo.habilitado = true;
    nuevo.tthhUsuarioId = '1'; // cambiar
    await this.usuarioRolRepository.save(nuevo).catch(e => {
      throw new UnprocessableEntityException(e.message, MessageEnum.ERROR_CREATE);
    });

    return new MessageResponse(HttpStatus.CREATED, MessageEnum.CREATED, nuevo);
  }

  async obtenerRolesPorIdUsuario(idUsuario: number): Promise<MessageResponse<any[]>> {
    const usuariosRoles = await this.usuarioRolRepository
      .find({
        relations: ['rol'],
        where: { usuarioId: idUsuario, habilitado: true, activo: true, rol: { activo: true } },
        order: { perfilId: 'ASC' },
      })
      .catch(e => {
        throw new UnprocessableEntityException(e.message, MessageEnum.BAD_REQUEST); // data: e.message
      });
    if (usuariosRoles.length < 1) {
      return new MessageResponse(HttpStatus.OK, MessageEnum.ENTITY_SELECT_EMPTY, null);
    }
    const roles = [];
    usuariosRoles.forEach(rol => roles.push(rol.perfilId));
    return new MessageResponse(HttpStatus.OK, MessageEnum.ENTITY_SELECT, roles);
  }

  async eliminarUsuarioRol(id: number): Promise<MessageResponse<{ id: number }>> {
    const rolUsuarioEntity = await this.usuarioRolRepository.findOne({ where: { id, habilitado: true } });
    if (!rolUsuarioEntity) {
      throw new NotFoundException({ message: MessageEnum.NOT_EXIST, data: null });
    }
    rolUsuarioEntity.activo = false;
    await this.usuarioRolRepository.save(rolUsuarioEntity).catch(e => {
      throw new UnprocessableEntityException(e.message, MessageEnum.ERROR_DELETE);
    });
    return new MessageResponse(HttpStatus.OK, MessageEnum.DELETED, { id });
  }

  async quitarAsignarRoles(idUsuario: number, estado: boolean): Promise<any> {
    const usuarioRol = await this.usuarioRolRepository.find({ where: { usuarioId: idUsuario } });
    if (!usuarioRol) {
      throw new NotFoundException({ message: MessageEnum.NOT_EXIST, data: null });
    }
    const rolesFun = new UsuarioRolEntity();
    const temp = usuarioRol?.map(rol => {
      rol.habilitado = estado;
    });
    Object.assign(temp, rolesFun);
    return this.usuarioRolRepository.save(rolesFun).catch(e => {
      throw new UnprocessableEntityException(e.message, MessageEnum.ERROR_UPDATE);
    });
  }
}
