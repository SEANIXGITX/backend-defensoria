import { HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { MessageResponse } from '../../shared/entities/message-response';
import { Message, MessageEnum } from '../../shared/enums/message.enum';
import { MenuService } from '../menu/menu.service';
import { UsuarioRolEntity } from '../rol/entities/usuario-rol.entity';
import { UsuarioEntity } from '../usuario/entities/usuario.entity';
import { UsuarioService } from '../usuario/usuario.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { RolService } from '../rol/rol.service';
import { UsuarioRolService } from '../rol/usuario-rol.service';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
    @InjectRepository(UsuarioRolEntity) private usuarioRolRepository: Repository<UsuarioRolEntity>,
    //@InjectRepository(FuncionarioEntity) private funcionarioRepository: Repository<FuncionarioEntity>,
    @InjectRepository(UsuarioEntity) private usuarioRepository: Repository<UsuarioEntity>,
    private menuService: MenuService,
    private readonly usuarioRolService: UsuarioRolService,
  ) {}

  async login(authLoginDto: AuthLoginDto): Promise<any> {
    const usuario = await this.validateUser(authLoginDto);

    const payload = { sub: usuario.data.id };

    const token = await this.getAccessToken(payload);
    const refreshToken = await this.getRefreshToken(payload);
    const usuariosRoles = await this.menuService.listarPorIdUsuario(usuario.data.id);
    const roles = await this.usuarioRolService.obtenerRolesPorIdUsuario(usuario.data.id);
    const menus = await this.menuService.menuJerarquicoPorUsuario(usuario.data.id);
    if (menus.data.length < 1) {
      throw new NotFoundException({ message: Message.notExists('Menus', ''), data: null });
    }
    /*
    const datosUsuario = await this.usuarioRepository
      .createQueryBuilder('u')
      .leftJoin('u.persona', 'persona')
      .where('u.id =:usuario and u.activo = true ', { usuario: usuario.data.id })
      .andWhere('persona.activo = true')
      .select(['u.id', 'persona.id', 'persona.nombres', 'persona.primerApellido', 'persona.segundoApellido', 'persona.fotografia'])
      .getOne()
      .catch(e => {
        throw new UnprocessableEntityException(e.message, Message.notExists('Usuario-Persona', usuario.data.id));
      });
    if (!datosUsuario) {
      throw new NotFoundException({ message: Message.notExists('Usuario-persona', usuario.data.id), data: null });
    }
    const datosFuncionario = await this.funcionarioRepository
      .createQueryBuilder('f')
      .leftJoinAndSelect('f.persona', 'persona')
      .leftJoinAndSelect('f.cargo', 'cargo')
      .leftJoinAndSelect('f.oficina', 'oficina')
      .leftJoin('persona.usuario', 'usuario')
      .where('usuario.id =:usuario', { usuario: usuario.data.id })
      .andWhere('f.activo = true AND f.estado =:vigente AND persona.activo = true', { vigente: 1 })
      .andWhere('oficina.activo = true AND oficina.habilitado = true')
      .select(['f.id', 'oficina.id', 'oficina.descripcion', 'cargo.id', 'cargo.descripcion'])
      .getOne()
      .catch(e => {
        throw new UnprocessableEntityException(e.message, Message.notExists('funcionario', usuario.data.id));
      });

    if (datosUsuario.persona.fotografia && existsSync(join(process.env.PATH_DOCS, datosUsuario.persona.fotografia))) {
      datosUsuario.persona.fotografia = downloadFileBuffer(datosUsuario.persona.fotografia).toString('base64');
    } else {
      datosUsuario.persona.fotografia = readFileSync(`./src/assets/user_profile.png`).toString('base64');
    }*/
    await this.updateRefreshTokenInUser(refreshToken, usuario.data.id);
    /* return {
      statusCode: HttpStatus.OK,
      message: MessageEnum.AUTHENTICATED,
      data: {
        usuario: {
          ...usuario.data,
          persona: {
            nombres: datosUsuario.persona.nombres,
            primerApellido: datosUsuario.persona.primerApellido,
            segundoApellido: datosUsuario.persona.segundoApellido,
            fotografia: datosUsuario.persona.fotografia,
          },
          token,
          refreshToken,
          usuariosRoles,
        },
        funcionario: {
          id: !datosFuncionario ? 0 : datosFuncionario.id,
          oficina: !datosFuncionario.oficina ? '' : datosFuncionario.oficina,
          cargo: !datosFuncionario ? '' : datosFuncionario.cargo,
        },
        menus: menus.data,
      },
    };*/
    return {
      statusCode: HttpStatus.OK,
      message: MessageEnum.AUTHENTICATED,
      data: {
        usuario: {
          ...usuario.data,
          token,
          refreshToken,
          roles: roles.data,
          persona: {
            nombres: 'Pepe',
            primerApellido: 'Lopez',
            segundoApellido: 'Perez',
            fotografia: null,
          },
          funcionario: {
            id: 3,
            cargo: 'Contrataciones',
            unidad: 'Administracion',
            unidadId: 3,
          },
          menus2: usuariosRoles.data,
        },
        menus: menus.data,
      },
    };
  }

  async validateUser(authLoginDto: AuthLoginDto): Promise<MessageResponse<UsuarioEntity>> {
    const { usuario, clave } = authLoginDto;
    return this.usuarioService.validate(usuario, clave);
  }

  async logout(userId: number): Promise<void> {
    return this.updateRefreshTokenInUser('', userId);
  }

  async updateRefreshTokenInUser(refreshToken, userId) {
    if (refreshToken) {
      const salt = await bcrypt.genSalt();
      refreshToken = await bcrypt.hash(refreshToken, salt);
    }
    await this.usuarioService.updateRefreshToken(refreshToken, userId);
  }

  async getAccessToken(payload) {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_TOKEN,
      expiresIn: process.env.JWT_TOKEN_EXPIRATION,
    });
  }

  async getRefreshToken(payload: JwtPayload) {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_TOKEN,
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION,
    });
  }

  async getNewAccessAndRefreshToken(payload: JwtPayload) {
    const refreshToken = await this.getRefreshToken(payload);
    await this.updateRefreshTokenInUser(refreshToken, payload.sub);

    return new MessageResponse(HttpStatus.OK, MessageEnum.AUTHENTICATED, {
      token: await this.getAccessToken(payload),
      refreshToken: refreshToken,
      id: payload.sub,
    });
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, username: string) {
    const usuario = await this.usuarioService.findOneByUserPrivateFields(username);
    const isRefreshTokenMatching = await bcrypt.compare(refreshToken, usuario.refreshToken);

    if (isRefreshTokenMatching) {
      await this.updateRefreshTokenInUser('', usuario.id);
      return usuario;
    } else {
      throw new UnauthorizedException({ message: MessageEnum.UNAUTHORIZED, data: null });
    }
  }

  async getUserIfRefreshTokenMatches2(refreshToken: string, id: number) {
    const usuario = await this.usuarioService.findOneByUserPrivateFields2(id); // recupera usuario por id
    const isRefreshTokenMatching = await bcrypt.compare(refreshToken, usuario.refreshToken);

    if (isRefreshTokenMatching) {
      await this.updateRefreshTokenInUser('', usuario.id);
      return usuario;
    } else {
      throw new UnauthorizedException({ message: MessageEnum.UNAUTHORIZED, data: null });
    }
  }

  async verifyPayload(payload: JwtPayload): Promise<UsuarioEntity> {
    let usuario: UsuarioEntity;
    try {
      if (!payload.sub) {
        throw new UnauthorizedException(`${MessageEnum.INVALID_USER}: ${payload.sub}`);
      }
      usuario = await this.usuarioService.validateById(payload.sub);
    } catch (error) {
      throw new UnauthorizedException(`${MessageEnum.INVALID_USER}: ${payload.sub}`);
    }
    return usuario;
  }
}
