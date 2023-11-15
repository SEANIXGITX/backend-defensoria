import { faker } from '@faker-js/faker';
import { ConflictException, HttpStatus, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigAsync } from '../../infrastructure/database/typeorm.config';
import { configValidationSchema } from '../../infrastructure/environment/config.schema';
import { MessageResponse } from '../../shared/entities/message-response';
import { MessageEnum } from '../../shared/enums/message.enum';
import { GlobalService } from '../auth/global.service';
import { UsuarioRolEntity } from '../rol/entities/usuario-rol.entity';
import { UsuarioEntity } from '../usuario/entities/usuario.entity';
import { MenuEntity } from './entities/menu.entity';
import { RolMenuEntity } from './entities/rol-menu.entity';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';

describe('MenuController', () => {
  let module: TestingModule;
  let controller: MenuController;

  let id: number;
  const MenuDto = {
    nombre: faker.commerce.productName() + Date.now(),
    descripcion: faker.random.word(),
    icono: faker.random.word(),
    url: faker.random.word(),
    posicion: parseInt(faker.random.numeric(1)),
    idPadre: 0,
  };

  beforeAll(async () => {
    GlobalService.userNameSession = 'test';
    module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ envFilePath: [`.env.test`], validationSchema: configValidationSchema }),
        TypeOrmModule.forRootAsync(typeOrmConfigAsync),
        TypeOrmModule.forFeature([MenuEntity, RolMenuEntity, UsuarioEntity, UsuarioRolEntity]),
      ],
      controllers: [MenuController],
      providers: [MenuService],
    }).compile();

    controller = module.get<MenuController>(MenuController);
  });

  afterAll(async () => {
    GlobalService.userNameSession = null;
    await module.close();
  });

  it('debe estar definido', () => {
    expect(controller).toBeDefined();
  });

  describe('crearMenu', () => {
    const createMenuDto = MenuDto;

    it('debe insertar con éxito un nuevo Menu', async () => {
      const messageResponse = await controller.crearMenu(createMenuDto);
      id = messageResponse.data.id;
      expect(messageResponse).toEqual(
        new MessageResponse(HttpStatus.CREATED, MessageEnum.CREATED, {
          id: expect.any(Number),
          ...createMenuDto,
          habilitado: true,
          usuarioCreacion: GlobalService.userNameSession,
          fechaCreacion: expect.any(Date),
          usuarioModificacion: GlobalService.userNameSession,
          fechaModificacion: expect.any(Date),
          activo: expect.any(Boolean),
        }),
      );
    });

    it('debe validar repetidos al intentar insertar el mismo Menu', async () => {
      expect.assertions(3);
      await controller.crearMenu(createMenuDto).catch(e => {
        expect(e).toBeInstanceOf(ConflictException);
        expect(e.message).toBe(MessageEnum.EXIST);
        expect(e.getResponse().data).toEqual({ id: expect.any(Number), ...createMenuDto, habilitado: true });
      });
    });

    it('debe generar un error de desbordamiento al insertar un Menu', async () => {
      createMenuDto.nombre = faker.lorem.words(30);
      await expect(controller.crearMenu(createMenuDto)).rejects.toEqual(
        //new UnprocessableEntityException(MessageEnum.ERROR_CREATE)
        new UnprocessableEntityException('el valor es demasiado largo para el tipo character varying(60)', MessageEnum.ERROR_CREATE),
      );
    });
  });

  describe('obtenerMenus', () => {
    it('debe obtener una lista de Menus', async () => {
      const messageResponse = await controller.obtenerMenus();
      expect(messageResponse.statusCode).toEqual(HttpStatus.OK);
      expect(messageResponse.message).toEqual(MessageEnum.ENTITY_SELECT);
      expect(messageResponse.data.length).toBeGreaterThan(0);
      expect(messageResponse.data.find(x => x.id == id)).toBeDefined();
    });
  });

  /*describe('actualizar', () => {
    let updateMenuDto = MenuDto;
    updateMenuDto.nombre = MenuDto.nombre + 'm'
      it('debe modificar con éxito un Menu', async () => {
        await expect(controller.actualizar(id, updateMenuDto)).resolves.toEqual(
          new MessageResponse(HttpStatus.OK, MessageEnum.UPDATED, {
            id: expect.any(Number),
            ...updateMenuDto,
            habilitado: true,
            usuarioModificacion: GlobalService.userNameSession,
            fechaModificacion: expect.any(Date),
          })
        );
      });
  });*/

  describe('delete', () => {
    it('debe eliminar de forma lógica un Menu', async () => {
      await expect(controller.delete(id)).resolves.toEqual(new MessageResponse(HttpStatus.OK, MessageEnum.DELETED, { id }));
    });
    /*it('debe devolver que No existe el Menu eliminado', async () => {
      await expect(controller.delete(id)).rejects.toEqual(new NotFoundException({ message: MessageEnum.NOT_EXIST, response: null }));
    });*/
  });

  describe('cambiar disponibilidad de menu', () => {
    it('cambio con existo', async () => {
      await expect(controller.cambiarDisponibilidad(1)).resolves.toEqual(
        new MessageResponse(HttpStatus.OK, MessageEnum.ENABLED, { id: 1, habilitado: expect.any(Boolean) }),
      );

      await controller.cambiarDisponibilidad(1);
    });

    it('debe devolver que No existe', async () => {
      await expect(controller.cambiarDisponibilidad(-1)).rejects.toEqual(
        new NotFoundException({ message: MessageEnum.NOT_EXIST, data: null }),
      );
    });
  });
});
