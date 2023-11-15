import { HttpStatus } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FuncionarioEntity } from 'src/identidad/funcionario/entities/funcionario.entity';

import { typeOrmConfigAsync } from '../../infrastructure/database/typeorm.config';
import { configValidationSchema } from '../../infrastructure/environment/config.schema';
import { MessageResponse } from '../../shared/entities/message-response';
import { MessageEnum } from '../../shared/enums/message.enum';
import { MenuModule } from '../menu/menu.module';
import { UsuarioRolEntity } from '../rol/entities/usuario-rol.entity';
import { RolModule } from '../rol/rol.module';
import { UsuarioEntity } from '../usuario/entities/usuario.entity';
import { UsuarioModule } from '../usuario/usuario.module';
import { UsuarioService } from '../usuario/usuario.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let module: TestingModule;
  let controller: AuthController;
  let serviceUser: UsuarioService;

  const nombre = 'test';
  const clave = 'test123';
  const authLoginDto = { nombre, clave };
  let userLoged: UsuarioEntity;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ envFilePath: [`.env.test`], validationSchema: configValidationSchema }),
        TypeOrmModule.forRootAsync(typeOrmConfigAsync),
        TypeOrmModule.forFeature([UsuarioRolEntity, FuncionarioEntity, UsuarioEntity]),
        UsuarioModule,
        MenuModule,
        RolModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({}),
      ],
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    serviceUser = module.get<UsuarioService>(UsuarioService);
  });

  afterAll(async () => {
    await module.close();
  });

  it('debe estar definido', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('debe autenticar con éxito un usuario válido', async () => {
      const messageResponse = await controller.login(authLoginDto);
      userLoged = messageResponse.data.usuario;
      expect(messageResponse).toHaveProperty('statusCode', HttpStatus.OK);
      expect(messageResponse).toHaveProperty('message', MessageEnum.AUTHENTICATED);
      expect(messageResponse).not.toHaveProperty('data', '');
      expect(messageResponse).not.toHaveProperty('0.usuario', '');
      expect(messageResponse).not.toHaveProperty('0.usuario.usuario', usuario);
      expect(messageResponse).not.toHaveProperty('0.usuario.persona.nombres', '');
      expect(messageResponse).toHaveProperty('data.usuario.token', expect.any(String));
      expect(messageResponse).toHaveProperty('data.usuario.refreshToken', expect.any(String));
      expect(messageResponse).not.toHaveProperty('0.usuario.usuariosRoles', '');
      expect(messageResponse).toHaveProperty('data.usuario.usuariosRoles.0.rol.id', expect.any(Number));
      expect(messageResponse).not.toHaveProperty('0.funcionario', '');
      expect(messageResponse).toHaveProperty('data.funcionario.oficina.descripcion', expect.any(String));
      expect(messageResponse).toHaveProperty('data.funcionario.cargo.descripcion', expect.any(String));
      expect(messageResponse).not.toHaveProperty('0.menus', '');
      expect(messageResponse).toHaveProperty('data.menus[0].nombre', expect.any(String));
      expect(messageResponse).toHaveProperty('data.menus.0.url', expect.any(String));
    });
  });

  describe('refresh-token', () => {
    it('debe refrescar el token de actualización de un usuario autenticado', async () => {
      const refreshTokenDto = { refreshToken: userLoged.refreshToken };
      const messageResponse = await controller.refreshToken(userLoged.id, refreshTokenDto);

      expect(messageResponse).toEqual(
        new MessageResponse(HttpStatus.OK, MessageEnum.AUTHENTICATED, {
          token: expect.any(String),
          refreshToken: expect.any(String),
          id: userLoged.id,
        }),
      );
    });
  });

  describe('logout', () => {
    it('debe limpiar el token de actualización de un usuario autenticado', async () => {
      await controller.logout(userLoged);
      const usuarioLogeado = await serviceUser.findOneByUserPrivateFields(userLoged.nombre);
      expect(usuarioLogeado.refreshToken).toBe('');
    });
  });
});
