import { Test, TestingModule } from '@nestjs/testing';

import { faker } from '@faker-js/faker/locale/es';
import { ConflictException, HttpStatus, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageResponse } from 'src/shared/entities/message-response';
import { MessageEnum } from 'src/shared/enums/message.enum';
import { typeOrmConfigAsync } from '../../infrastructure/database/typeorm.config';
import { configValidationSchema } from '../../infrastructure/environment/config.schema';
import { GlobalService } from '../auth/global.service';
import { MenuEntity } from '../menu/entities/menu.entity';
import { RolMenuEntity } from '../menu/entities/rol-menu.entity';
import { UsuarioEntity } from '../usuario/entities/usuario.entity';
import { CrearRolDto } from './dto/create-rol-dto';
import { RolEntity } from './entities/rol.entity';
import { RolController } from './rol.controller';
import { RolService } from './rol.service';
import { RolPermisoEntity } from '../permiso/entities/rol-permiso.entity';
import { PermisoEntity } from '../permiso/entities/permiso.entity';

describe('PermisosController', () => {
  let module: TestingModule;
  let controller: RolController;

  let id;
  const crearRolDto: CrearRolDto = { nombre: 'miRol' + Date.now(), descripcion: 'test', codigo: 'miRol_' + Date.now() };

  beforeAll(async () => {
    GlobalService.userNameSession = 'test';
    module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ envFilePath: [`.env.test`], validationSchema: configValidationSchema }),
        TypeOrmModule.forRootAsync(typeOrmConfigAsync),
        TypeOrmModule.forFeature([RolEntity, UsuarioEntity, RolMenuEntity, MenuEntity, RolPermisoEntity, PermisoEntity]),
      ],
      controllers: [RolController],
      providers: [RolService],
    }).compile();

    controller = module.get<RolController>(RolController);
  });

  afterAll(async () => {
    GlobalService.userNameSession = null;
    await module.close();
  });

  it('debe estar definido', () => {
    expect(controller).toBeDefined();
  });

  describe('crear un nuevo rol', () => {
    it('debe crear con éxito', async () => {
      const messageResponse = await controller.crearRol(crearRolDto);
      id = messageResponse.data.id;
      expect(messageResponse).toEqual(
        new MessageResponse(HttpStatus.CREATED, MessageEnum.CREATED, {
          id: expect.any(Number),
          ...crearRolDto,
          habilitado: true,
          activo: expect.any(Boolean),
          descripcion: 'test',
          fechaCreacion: expect.any(Date),
          fechaModificacion: expect.any(Date),
          usuarioCreacion: GlobalService.userNameSession,
          usuarioModificacion: GlobalService.userNameSession,
        }),
      );
    });

    it('debe validar inserción con nombre repetido', async () => {
      await expect(controller.crearRol(crearRolDto)).rejects.toEqual(new ConflictException({ message: MessageEnum.EXIST, data: null }));
    });

    it('debe generar un error de desbordamiento al insertar un nombre', async () => {
      const crearRol: any = {};
      crearRol.nombre = faker.lorem.words(400);
      crearRol.descripcion = faker.lorem.words(10);
      crearRol.codigo = faker.lorem.words(10);
      await expect(controller.crearRol(crearRol)).rejects.toEqual(
        new UnprocessableEntityException('el valor es demasiado largo para el tipo character varying(30)', MessageEnum.ERROR_CREATE),
      );
    });
  });

  describe('cambiar disponibilidad de rol', () => {
    it('cambio con existo', async () => {
      await expect(controller.cambiarDisponibilidad(id)).resolves.toEqual(
        new MessageResponse(HttpStatus.OK, MessageEnum.ENABLED, { id, habilitado: expect.any(Boolean) }),
      );
    });

    it('debe devolver que No existe', async () => {
      await expect(controller.cambiarDisponibilidad(-1)).rejects.toEqual(
        new NotFoundException({ message: MessageEnum.NOT_EXIST, data: null }),
      );
    });
  });

  describe('Debe agregar un menu al rol', () => {
    it('debe agregar con éxito enviando id de rolMenu y menuId', async () => {
      const messageResponse = await controller.agregarOQuitarMenu(id, { id: 1, menuId: 1 });
      expect(messageResponse).toEqual(new MessageResponse(HttpStatus.ACCEPTED));
    });
    it('debe agregar con éxito enviando solo menuId', async () => {
      const messageResponse = await controller.agregarOQuitarMenu(id, { menuId: 1 });
      expect(messageResponse).toEqual(new MessageResponse(HttpStatus.ACCEPTED));
    });

    it('debe dar error, si menu no existe', async () => {
      await expect(controller.agregarOQuitarMenu(id, { menuId: -1 })).rejects.toEqual(
        new NotFoundException({ message: MessageEnum.NOT_EXIST_MENU }),
      );
    });

    it('debe dar error, si rol no existe', async () => {
      await expect(controller.agregarOQuitarMenu(-1, { menuId: 1 })).rejects.toEqual(
        new NotFoundException({ message: MessageEnum.NOT_EXIST_ROL }),
      );
    });
  });

  describe('Debe agregar un permiso al rol', () => {
    it('debe agregar con éxito enviando id de rolPermiso e idPermiso', async () => {
      const messageResponse = await controller.agregarOQuitarPermisos(id, { id: 1, idPermiso: 1 });
      expect(messageResponse).toEqual(new MessageResponse(HttpStatus.ACCEPTED));
    });
    it('debe agregar con éxito enviando solo idPermiso', async () => {
      const messageResponse = await controller.agregarOQuitarPermisos(id, { idPermiso: 1 });
      expect(messageResponse).toEqual(new MessageResponse(HttpStatus.ACCEPTED));
    });

    it('debe dar error, si permiso no existe', async () => {
      await expect(controller.agregarOQuitarPermisos(id, { idPermiso: -1 })).rejects.toEqual(
        new NotFoundException({ message: MessageEnum.NOT_EXIST_PERMISO }),
      );
    });

    it('debe dar error, si rol no existe', async () => {
      await expect(controller.agregarOQuitarPermisos(-1, { idPermiso: 1 })).rejects.toEqual(
        new NotFoundException({ message: MessageEnum.NOT_EXIST_ROL }),
      );
    });
  });

  describe('eliminar de forma lógica un rol', () => {
    it('debe eliminar con éxito', async () => {
      await expect(controller.delete(id)).resolves.toEqual(new MessageResponse(HttpStatus.OK, MessageEnum.DELETED, { id }));
    });

    it('debe devolver que No existe', async () => {
      await expect(controller.delete(-1)).rejects.toEqual(new NotFoundException({ message: MessageEnum.NOT_EXIST }));
    });
  });
});
