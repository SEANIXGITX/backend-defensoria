import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginationResult } from 'src/shared/entities/pagination-result';
import { paginateQuery } from 'src/shared/querys/pagination.query';
import { DataSource, Not, Repository } from 'typeorm';

import { MessageResponse } from '../../shared/entities/message-response';
import { Message, MessageEnum } from '../../shared/enums/message.enum';
import { RolEntity } from '../rol/entities/rol.entity';
import { UsuarioRolEntity } from '../rol/entities/usuario-rol.entity';
import { CreateUsuarioRolDto } from './dto/create-usuario-rol-dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { RolEnum } from './entities/rol.enum';
import { UsuarioEntity } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UsuarioRolService } from '../rol/usuario-rol.service';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity) private usuarioRepository: Repository<UsuarioEntity>,
    @InjectRepository(RolEntity) private rolRepository: Repository<RolEntity>,
    @InjectRepository(UsuarioRolEntity) private usuarioRolRepository: Repository<UsuarioRolEntity>,
    //@InjectRepository(PersonaEntity) private personaRepository: Repository<PersonaEntity>,
    private dataSource: DataSource,
    //private personaService: PersonaService
    private usurarioRolService: UsuarioRolService,
  ) {}

  async create(usuarioDto: CreateUsuarioDto): Promise<MessageResponse<UsuarioEntity>> {
    /*let persona;
    if (usuarioDto.idPersona !== '0') {
      persona = await this.personaRepository.findOne({ where: { id: usuarioDto.idPersona, activo: true } });
    }

    if (!persona && usuarioDto.idPersona !== '0')
      throw new NotFoundException({ message: Message.notExists('Persona', usuarioDto.idPersona), data: null });

    if (persona && usuarioDto.idPersona !== '0') {
      const existe = await this.usuarioRepository.findOne({
        where: { usuario: usuarioDto.usuario.trim(), idPersona: usuarioDto.idPersona, activo: true },
      });

      if (existe) throw new ConflictException({ message: MessageEnum.EXIST, data: existe });
    }
    */
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    let usuarioSaved;
    try {
      /*if (!persona) {
        ({ data: persona } = await this.personaService.createManager(usuarioDto.persona, queryRunner.manager));
      }*/

      // aqui debo conseguir el tthhUsuarioId
      const existe = await this.usuarioRepository.findOne({
        where: { nombre: usuarioDto.nombre.trim(), activo: true },
      });

      if (existe) throw new ConflictException({ message: MessageEnum.EXIST, data: existe });
      const usuario = new UsuarioEntity();
      Object.assign(usuario, usuarioDto);
      // usuario.personaId = persona.id;
      usuario.tthhUsuarioId = '1';
      usuario.nombre = usuario.nombre.trim();
      usuario.clave = process.env.DEFAULT_PASS;
      usuario.habilitado = true;
      // usuario.persona = persona;

      usuarioSaved = await queryRunner.manager.save(usuario);

      delete usuarioSaved.clave;

      await queryRunner.commitTransaction();
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw new UnprocessableEntityException(e.message, MessageEnum.ERROR_CREATE);
    } finally {
      await queryRunner.release();
    }
    return new MessageResponse(HttpStatus.CREATED, MessageEnum.CREATED, usuarioSaved);
  }

  async findAll(): Promise<MessageResponse<UsuarioEntity[]>> {
    //const usrs = await this.usuarioRepository.find({ relations: ['persona'], where: { habilitado: true, activo: true } });
    const usrs = await this.usuarioRepository.find({ where: { habilitado: true, activo: true } });
    if (usrs.length < 1) {
      return new MessageResponse(HttpStatus.OK, MessageEnum.ENTITY_SELECT_EMPTY, []);
    }
    return new MessageResponse(HttpStatus.OK, MessageEnum.ENTITY_SELECT, usrs);
  }

  async findOne(id: number): Promise<MessageResponse<UsuarioEntity>> {
    const usuario = await this.usuarioRepository.findOne({
      where: { id, activo: true },
      select: ['id', 'nombre', 'unidadId', 'habilitado'],
      // relations: ['persona', 'persona.pais', 'persona.municipio'],
    });

    if (!usuario) {
      throw new NotFoundException({ message: MessageEnum.NOT_EXIST, data: null });
    }
    return new MessageResponse(HttpStatus.OK, MessageEnum.ENTITY_SELECT, usuario);
  }

  async findOneByUser(usuario: string): Promise<MessageResponse<UsuarioEntity>> {
    const usr = await this.usuarioRepository.findOne({
      where: { nombre: usuario, activo: true },
      select: ['id', 'nombre', 'habilitado'],
      // relations: ['persona', 'persona.pais', 'persona.municipio'], 'idPersona',
    });
    if (!usr) {
      throw new NotFoundException({ message: MessageEnum.NOT_EXIST, data: null });
    }
    return new MessageResponse(HttpStatus.OK, MessageEnum.ENTITY_SELECT, usr);
  }

  async enable(id: number): Promise<MessageResponse<{ id: number; habilitado: boolean }>> {
    const usuario = await this.usuarioRepository.findOne({ where: { id, activo: true } });
    if (!usuario) {
      throw new NotFoundException({ message: MessageEnum.NOT_EXIST, data: null });
    }

    usuario.habilitado = !usuario.habilitado;
    await this.usuarioRepository.update(id, { habilitado: usuario.habilitado }).catch(e => {
      throw new UnprocessableEntityException(e.message, MessageEnum.ERROR_UPDATE);
    });

    return new MessageResponse(HttpStatus.OK, MessageEnum.ENABLED, { id: usuario.id, habilitado: usuario.habilitado });
  }

  async remove(id: number): Promise<MessageResponse<{ id: number }>> {
    const usuario = await this.usuarioRepository.findOne({ where: { id, activo: true } });
    if (!usuario) {
      throw new NotFoundException({ message: MessageEnum.NOT_EXIST, data: null });
    }
    await this.usuarioRepository.update(id, { activo: false }).catch(e => {
      throw new UnprocessableEntityException(e.message, MessageEnum.ERROR_DELETE);
    });
    return new MessageResponse(HttpStatus.OK, MessageEnum.DELETED, { id: usuario.id });
  }

  async changePassword(id: number, clave: string): Promise<MessageResponse<{ id: number }>> {
    const usuario = await this.usuarioRepository.findOne({ where: { id, habilitado: true, activo: true } });
    if (!usuario) {
      throw new NotFoundException({ message: MessageEnum.NOT_EXIST, data: null });
    }

    const salt = await bcrypt.genSalt();
    await this.usuarioRepository.update(id, { clave: await bcrypt.hash(clave, salt) }).catch(e => {
      throw new UnprocessableEntityException(e.message, MessageEnum.ERROR_UPDATE);
    });

    return new MessageResponse(HttpStatus.OK, MessageEnum.UPDATED, { id: usuario.id });
  }

  // Internal
  async updateRefreshToken(refreshToken, id) {
    await this.usuarioRepository.update({ id }, { refreshToken: refreshToken });
  }

  async findOneByUserPrivateFields(_usuario: string): Promise<UsuarioEntity> {
    const usuario = await this.usuarioRepository.findOne({
      where: { nombre: _usuario, habilitado: true, activo: true },
      select: ['id', 'nombre', 'clave', 'refreshToken'],
    });

    if (!usuario) {
      throw new NotFoundException({ message: MessageEnum.INVALID_USER, data: null });
    }
    return usuario;
  }

  async findOneByUserPrivateFields2(_id: number): Promise<UsuarioEntity> {
    const usuario = await this.usuarioRepository.findOne({
      where: { id: _id, habilitado: true, activo: true },
      select: ['id', 'nombre', 'clave', 'refreshToken'],
    });

    if (!usuario) {
      throw new NotFoundException({ message: MessageEnum.INVALID_USER, data: null });
    }
    return usuario;
  }

  async validateById(id: number): Promise<UsuarioEntity> {
    const usuario = await this.usuarioRepository.findOne({
      where: { id, habilitado: true, activo: true },
      select: ['id', 'nombre'],
    });
    if (!usuario) {
      throw new NotFoundException({ message: MessageEnum.INVALID_USER, data: null });
    }
    const roles = (await this.usurarioRolService.obtenerRolesPorIdUsuario(id)).data;
    //[RolEnum.USER]
    usuario.roles = roles;

    return usuario;
  }

  async validate(_usuario: string, clave: string): Promise<MessageResponse<UsuarioEntity>> {
    const usuarioOk = await this.usuarioRepository.findOne({
      where: { nombre: _usuario, habilitado: true, activo: true },
      select: ['id', 'nombre', 'clave', 'refreshToken'],
    });
    if (!usuarioOk || !(await usuarioOk?.validatePassword(clave))) {
      throw new UnauthorizedException({ message: MessageEnum.INVALID_CREDENTIAL, data: null });
    }

    return this.findOne(usuarioOk.id);
  }

  async list(options: PaginationDto): Promise<MessageResponse<PaginationResult>> {
    const qb = this.usuarioRepository
      .createQueryBuilder('usuario')
      //.leftJoinAndSelect('usuario.persona', 'persona')
      .leftJoinAndSelect('usuario.rolesUsuario', 'rolesUsuario', 'usuario.id = rolesUsuario.usuarioId and rolesUsuario.habilitado = true')
      .where('usuario.activo')
      .select([
        'usuario',
        'usuario.usuarioCreacion',
        'usuario.usuarioModificacion',
        'usuario.fechaCreacion',
        'usuario.fechaModificacion',
        'rolesUsuario',
      ]);

    return paginateQuery(qb, options);
  }

  async agregarOQuitarRoles(
    idUsuario: number,
    usuarioRolDto: CreateUsuarioRolDto,
  ): Promise<MessageResponse<{ id: number; habilitado: boolean }>> {
    const rol = await this.rolRepository.findOne({ where: { id: usuarioRolDto.perfilId, activo: true } });
    if (!rol) throw new NotFoundException({ message: MessageEnum.NOT_EXIST_ROL, data: null });

    const usuario = await this.usuarioRepository.findOne({ where: { id: idUsuario, activo: true } });
    if (!usuario) throw new NotFoundException({ message: MessageEnum.INVALID_USER, data: null });

    let usuarioRol;

    if (usuarioRolDto?.id) {
      usuarioRol = await this.usuarioRolRepository.findOne({
        where: { id: usuarioRolDto.id, activo: true },
        order: { fechaCreacion: 'DESC' },
      });
    } else {
      usuarioRol = await this.usuarioRolRepository.findOne({
        where: { usuarioId: idUsuario, perfilId: usuarioRolDto.perfilId, activo: true },
        order: { fechaCreacion: 'DESC' },
      });
    }

    await this.usuarioRolRepository.save({
      id: usuarioRol?.id,
      usuarioId: idUsuario,
      perfilId: usuarioRolDto.perfilId,
      habilitado: !usuarioRol?.habilitado,
    });

    return new MessageResponse(HttpStatus.ACCEPTED);
  }

  async restablecesClave(idUsuario: number): Promise<MessageResponse<UsuarioEntity>> {
    const existe = await this.usuarioRepository.findOneBy({
      id: idUsuario,
      activo: true,
    });

    if (!existe) throw new NotFoundException({ message: MessageEnum.NOT_EXIST, data: null });

    const usuario = new UsuarioEntity();
    usuario.clave = process.env.DEFAULT_PASS;

    await this.usuarioRepository.update(idUsuario, usuario).catch(e => {
      throw new UnprocessableEntityException(e.message, MessageEnum.ERROR_CREATE);
    });
    return new MessageResponse(HttpStatus.OK, MessageEnum.UPDATED);
  }
}
