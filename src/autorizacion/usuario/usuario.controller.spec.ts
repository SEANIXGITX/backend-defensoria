import { faker } from '@faker-js/faker/locale/es';
import { ConflictException, HttpStatus, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { PersonaDomicilioDto } from 'src/identidad/persona-domicilio/dto/persona-domicilio.dto';
import { DomicilioEnum } from 'src/identidad/persona-domicilio/enums/domicilio.emun';
import { PersonaFotografiaDto } from 'src/identidad/persona/dto/persona-fotografia.dto';
import { PersonaEntity } from 'src/identidad/persona/entities/persona.entity';
import { DocumentoIdentidadEnum } from 'src/identidad/persona/enums/documento-identidad.enum';
import { EstadoCivilEnum } from 'src/identidad/persona/enums/estado-civil.enum';
import { GeneroEnum } from 'src/identidad/persona/enums/genero.enum';
import { PersonaModule } from 'src/identidad/persona/persona.module';
import { fileToBuffer } from 'src/shared/utils/file.util';
import { typeOrmConfigAsync } from '../../infrastructure/database/typeorm.config';
import { configValidationSchema } from '../../infrastructure/environment/config.schema';
import { MessageResponse } from '../../shared/entities/message-response';
import { MessageEnum } from '../../shared/enums/message.enum';
import { GlobalService } from '../auth/global.service';
import { RolEntity } from '../rol/entities/rol.entity';
import { UsuarioRolEntity } from '../rol/entities/usuario-rol.entity';
import { UsuarioEntity } from './entities/usuario.entity';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';

describe('UsuarioController', () => {
  let module: TestingModule;
  let controller: UsuarioController;

  let id: number;
  const date = new Date();
  const usuario = `test${date.getTime().toString()}`;
  const tipo = 'Manual';
  const idPersona = '0'; // debe existir y no tienen que tener usuario asignado
  const idPersonaOtra = '131896'; // debe existir y no tienen que tener usuario asignado
  const createUsuarioDto = { tipo, usuario, idPersona, persona: undefined, habilitado: true };

  const domicilio1: PersonaDomicilioDto = {
    id: '0',
    tipo: DomicilioEnum.REAL,
    direccion: faker.address.street(),
    zona: faker.address.cityName(),
    latitud: faker.address.latitude(99, -99),
    longitud: faker.address.longitude(99, -99),
  };
  const domicilio2: PersonaDomicilioDto = {
    id: '0',
    tipo: DomicilioEnum.PROCESAL,
    direccion: faker.address.street(),
    zona: faker.address.cityName(),
    latitud: faker.address.latitude(99, -99),
    longitud: faker.address.longitude(99, -99),
  };
  const domicilios = [domicilio1, domicilio2];

  let personaFotografiaDto: PersonaFotografiaDto;
  beforeAll(async () => {
    GlobalService.userNameSession = 'test';
    module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ envFilePath: [`.env.test`], validationSchema: configValidationSchema }),
        TypeOrmModule.forRootAsync(typeOrmConfigAsync),
        TypeOrmModule.forFeature([UsuarioEntity, RolEntity, UsuarioRolEntity, PersonaEntity]),
        PersonaModule,
      ],
      controllers: [UsuarioController],
      providers: [UsuarioService],
    }).compile();

    controller = module.get<UsuarioController>(UsuarioController);

    const imagePersona = join('./src', 'assets', 'user_profile.png');
    const imageBufferPersona = (await fileToBuffer(imagePersona)) as Buffer;
    personaFotografiaDto = { extension: 'png', base64s: imageBufferPersona.toString() };

    createUsuarioDto.persona = {
      id: '0',
      idPaisNacimiento: 1,
      idMunicipioNacimiento: 1,
      documentoIdentidad: faker.random.numeric(5),
      tipoDocumento: DocumentoIdentidadEnum.CI,
      nombres: 'Juan ' + faker.name.firstName('male'),
      primerApellido: faker.name.lastName(),
      segundoApellido: faker.name.middleName(),
      genero: GeneroEnum.MASCULINO,
      fechaNacimiento: new Date('2000-01-01'),
      celular: faker.phone.number('+591-###-###'),
      correoElectronico: faker.internet.email(),
      estadoCivil: EstadoCivilEnum.SOLTERO,
      profesionOcupacion: 'Abogado',
      esCiudadanoDigital: false,
      validadoSegip: false,
      domicilios,
      fotografia: personaFotografiaDto,
    };
  });

  afterAll(async () => {
    GlobalService.userNameSession = null;
    await module.close();
  });

  it('debe estar definido', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('debe insertar con éxito un nuevo Usuario', async () => {
      const messageResponse = await controller.create(createUsuarioDto);
      id = messageResponse.data.id;
      createUsuarioDto.idPersona = messageResponse.data.idPersona.toString();
      createUsuarioDto.persona = messageResponse.data.persona;

      expect(messageResponse).toMatchObject(
        new MessageResponse(HttpStatus.CREATED, MessageEnum.CREATED, {
          id: expect.any(Number),
          habilitado: true,
          usuarioCreacion: GlobalService.userNameSession,
          fechaCreacion: expect.any(Date),
          usuarioModificacion: GlobalService.userNameSession,
          fechaModificacion: expect.any(Date),
          activo: expect.any(Boolean),
        }),
      );
    });

    it('debe validar repetidos al intentar insertar el mismo Usuario', async () => {
      expect.assertions(3);
      await controller.create(createUsuarioDto).catch(e => {
        expect(e).toBeInstanceOf(ConflictException);
        expect(e.message).toBe(MessageEnum.EXIST);
        expect(e.getResponse().data).toMatchObject({ id: expect.any(Number), habilitado: true });
      });
    });

    it('debe validar repetidos al intentar insertar el mismo Usuario para dos personas', async () => {
      const createUsuarioCompartidoDto = { ...createUsuarioDto };
      createUsuarioCompartidoDto.idPersona = idPersonaOtra;

      await controller.create(createUsuarioCompartidoDto).catch(e => {
        expect(e).toBeInstanceOf(ConflictException);
        expect(e.message).toBe(MessageEnum.EXIST);
        expect(e.getResponse().data).toMatchObject({ id: expect.any(Number), habilitado: true });
      });
    });

    it('debe validar repetidos el numero de caracteres de usuario al insertar una misma Persona con dos usuarios', async () => {
      const createUsuarioCompartidoDto = { ...createUsuarioDto };
      createUsuarioCompartidoDto.usuario = faker.lorem.words(10);

      await controller.create(createUsuarioDto).catch(e => {
        expect(e).toBeInstanceOf(ConflictException);
        expect(e.message).toBe(MessageEnum.EXIST);
        expect(e.getResponse().data).toMatchObject({ id: expect.any(Number), habilitado: true });
      });
    });

    it('debe generar un error de desbordamiento al insertar un Usuario', async () => {
      await expect(controller.create({ ...createUsuarioDto, usuario: faker.lorem.words(30), idPersona: '131896' })).rejects.toEqual(
        new UnprocessableEntityException('el valor es demasiado largo para el tipo character varying(30)', MessageEnum.ERROR_CREATE),
      );
    });
  });
  describe('findAll', () => {
    it('debe obtener una lista de Usuarios', async () => {
      const messageResponse = await controller.findAll();
      expect(messageResponse.statusCode).toEqual(HttpStatus.OK);
      expect(messageResponse.message).toEqual(MessageEnum.ENTITY_SELECT);
      expect(messageResponse.data.length).toBeGreaterThan(0);
      expect(messageResponse.data.find(x => x.id == id)).toBeDefined();
    });
  });

  describe('findOne', () => {
    it('debe devolver un Usuario en base a un id', async () => {
      await expect(controller.findOne(id)).resolves.toEqual(
        new MessageResponse(HttpStatus.OK, MessageEnum.ENTITY_SELECT, {
          ...createUsuarioDto,
          id,
          persona: expect.any(PersonaEntity),
        }),
      );
    });

    it('debe devolver un Usuario en base al campo usuario', async () => {
      await expect(controller.findOneByUser(usuario)).resolves.toEqual(
        new MessageResponse(HttpStatus.OK, MessageEnum.ENTITY_SELECT, { ...createUsuarioDto, id, persona: expect.any(PersonaEntity) }),
      );
    });

    it('debe devolver que No existe un Usuario', async () => {
      await expect(controller.findOne(-1)).rejects.toEqual(new NotFoundException({ message: MessageEnum.NOT_EXIST, data: null }));
      await expect(controller.findOneByUser('-1')).rejects.toEqual(new NotFoundException({ message: MessageEnum.NOT_EXIST, data: null }));
    });
  });

  describe('update', () => {
    it('debe modificar con éxito un Usuario', async () => {
      const updateUsuarioDto = {
        tipo,
        usuario: usuario + 'm',
        idPersona: createUsuarioDto.idPersona,
        persona: { ...createUsuarioDto.persona, fotografia: personaFotografiaDto, domicilios },
      };
      await expect(controller.update(id, updateUsuarioDto)).resolves.toEqual(
        new MessageResponse(HttpStatus.OK, MessageEnum.UPDATED, {
          id: expect.any(Number),
          ...updateUsuarioDto,
          persona: expect.any(PersonaEntity),
          habilitado: true,
        }),
      );
    });

    it('debe devolver que no existe un Usuario antes de intentar modificarse', async () => {
      const updateUsuarioDto = {
        tipo,
        usuario: usuario + 'm',
        idPersona: createUsuarioDto.idPersona,
        persona: { ...createUsuarioDto.persona, fotografia: personaFotografiaDto, domicilios },
      };
      await expect(controller.update(-1, updateUsuarioDto)).rejects.toEqual(
        new NotFoundException({ message: MessageEnum.NOT_EXIST, data: null }),
      );
    });

    it('debe generar un error de desbordamiento al modificar un Rol', async () => {
      const updateUsuarioDto = {
        tipo,
        usuario: usuario + 'm',
        idPersona: createUsuarioDto.idPersona,
        persona: { ...createUsuarioDto.persona, fotografia: personaFotografiaDto, domicilios },
      };
      updateUsuarioDto.usuario = faker.lorem.words(30);
      await expect(controller.update(id, updateUsuarioDto)).rejects.toEqual(
        new UnprocessableEntityException('el valor es demasiado largo para el tipo character varying(30)', MessageEnum.ERROR_UPDATE),
      );
    });
  });

  describe('password', () => {
    it('debe cambiar la contraseña de un Usuario activo', async () => {
      await expect(controller.changePassword(id, { clave: 'T3st123.' })).resolves.toEqual(
        new MessageResponse(HttpStatus.OK, MessageEnum.UPDATED, { id }),
      );
    });

    it('debe restablecer la contraseña de un Usuario activo', async () => {
      await expect(controller.resetPassword(id)).resolves.toEqual(new MessageResponse(HttpStatus.OK, MessageEnum.UPDATED, { id }));
    });
  });

  describe('Debe agregar un rol al usuario', () => {
    it('debe agregar con éxito enviando id de usuarioRol e idRol', async () => {
      const messageResponse = await controller.agregarOQuitarRoles(1, { id, idRol: 1 });
      expect(messageResponse).toEqual(new MessageResponse(HttpStatus.ACCEPTED));
    });
    it('debe agregar con éxito enviando solo idRol', async () => {
      const messageResponse = await controller.agregarOQuitarRoles(id, { idRol: 1 });
      expect(messageResponse).toEqual(new MessageResponse(HttpStatus.ACCEPTED));
    });

    it('debe dar error, si rol no existe', async () => {
      await expect(controller.agregarOQuitarRoles(id, { idRol: -1 })).rejects.toEqual(
        new NotFoundException({ message: MessageEnum.NOT_EXIST_ROL }),
      );
    });

    it('debe dar error, si usuario no existe', async () => {
      await expect(controller.agregarOQuitarRoles(-1, { idRol: 1 })).rejects.toEqual(
        new NotFoundException({ message: MessageEnum.INVALID_USER }),
      );
    });
  });

  describe('Restablecer Clave', () => {
    it('debe restablecer con exito', async () => {
      await expect(controller.restablecerClave(id)).resolves.toEqual(new MessageResponse(HttpStatus.OK, MessageEnum.UPDATED));
    });

    it('debe devolver que No existe el Usuario', async () => {
      await expect(controller.restablecerClave(-1)).rejects.toEqual(new NotFoundException({ message: MessageEnum.NOT_EXIST, data: null }));
    });
  });
  describe('generar nombre de usuario', () => {
    it('debe generar con exito', async () => {
      await expect(controller.generarNombreUsuario(createUsuarioDto.idPersona)).resolves.toEqual(
        new MessageResponse(HttpStatus.OK, MessageEnum.ENTITY_SELECT, { nombreUsuario: expect.any(String) }),
      );
    });

    it('debe devolver que No existe persona', async () => {
      await expect(controller.restablecerClave(-1)).rejects.toEqual(new NotFoundException({ message: MessageEnum.NOT_EXIST, data: null }));
    });
  });

  describe('list - obtener usuarios con Paginación', () => {
    it('debe obtener datos', async () => {
      const paginationDto = {
        page: 1,
        perPage: 10,
        search: [{ fields: ['id'], keyword: 1 }],
        sort: [{ field: 'usuario', orderType: 'ASC' }],
      };

      const messageResponse = await controller.list(paginationDto);
      expect(messageResponse.statusCode).toEqual(HttpStatus.OK);
      expect(messageResponse.message).toEqual(MessageEnum.ENTITY_SELECT);
      expect(messageResponse.data).toMatchObject({
        pagination: {
          totalItems: 1,
          itemCount: 1,
          perPage: 10,
          from: 1,
          to: 1,
          currentPage: 1,
          lastPage: 1,
          nextPage: null,
          prevPage: null,
        },
        result: [
          {
            id: 1,
            habilitado: true,
            persona: expect.any(PersonaEntity),
            usuario: expect.any(String),
            usuarioCreacion: 'gptsj',
            fechaCreacion: expect.any(Date),
            fechaModificacion: expect.any(Date),
            usuarioModificacion: 'gptsj',
          },
        ],
      });
    });

    it('debe obtener data [] cuando no existen coincidencias', async () => {
      const paginationDto = { page: 100, per_page: 1, search: [{ fields: ['id'], keyword: -1 }], sort: [] };
      const messageResponse = await controller.list(paginationDto);
      expect(messageResponse).toEqual({
        statusCode: HttpStatus.OK,
        message: MessageEnum.ENTITY_SELECT_EMPTY,
        data: { pagination: expect.any(Object), result: [] },
      });

      await expect(controller.list({})).resolves.toMatchObject({ statusCode: HttpStatus.OK });
    });
  });

  describe('enable', () => {
    it('debe habilitar/deshabilitar un Usuario', async () => {
      await expect(controller.enable(id)).resolves.toEqual(
        new MessageResponse(HttpStatus.OK, MessageEnum.ENABLED, { id, habilitado: expect.any(Boolean) }),
      );
    });

    it('debe devolver que No existe el Usuario a habilitarse', async () => {
      await expect(controller.enable(-1)).rejects.toEqual(new NotFoundException({ message: MessageEnum.NOT_EXIST, data: null }));
    });
  });

  describe('remove', () => {
    it('debe eliminar de forma lógica un Usuario', async () => {
      await expect(controller.remove(id)).resolves.toEqual(new MessageResponse(HttpStatus.OK, MessageEnum.DELETED, { id }));
    });
    it('debe devolver que No existe el Usuario eliminado', async () => {
      await expect(controller.remove(id)).rejects.toEqual(new NotFoundException({ message: MessageEnum.NOT_EXIST, data: null }));
    });
  });
});
