import { ProgramaResponsableService } from './../programa-responsable/programa-responsable.service';
import { HttpStatus, Injectable, UnprocessableEntityException, ConflictException, NotFoundException } from '@nestjs/common';
import { CreateProgramaDto } from './dto/create-programa.dto';
import { UpdateProgramaDto } from './dto/update-programa.dto';
import { ProgramaEntity } from './entities/programa.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationResult } from 'src/shared/entities/pagination-result';
import { MessageResponse } from 'src/shared/entities/message-response';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { paginateQuery } from 'src/shared/querys/pagination.query';
import { Message, MessageEnum } from 'src/shared/enums/message.enum';
import { ListaProgramaDto } from './dto/ponderar.dto';
import { EstadoEnum } from 'src/shared/enums/estado.enum';
import { EjecutarProgramaDto } from './dto/ejecutar-programa.dto';

@Injectable()
export class ProgramaService {
  entityNameMessage = 'Programa';

  constructor(
    @InjectRepository(ProgramaEntity) private programaRepository: Repository<ProgramaEntity>,
    private programaResponsableService: ProgramaResponsableService,
  ) {}

  async create(createProgramaDto: CreateProgramaDto) {
    // codigo o descripcion
    const buscar = await this.programaRepository
      .findOne({ where: { descripcion: createProgramaDto.descripcion.trim(), gestionId: createProgramaDto.gestionId, activo: true } })
      .catch(e => {
        throw new UnprocessableEntityException(e.message, Message.errorCreate(this.entityNameMessage));
      });
    if (buscar) {
      throw new ConflictException({ message: MessageEnum.EXIST, data: buscar });
    }
    let ultimo = 0;
    const cantidad = await this.programaRepository.findAndCountBy({ gestionId: createProgramaDto.gestionId });
    ultimo = cantidad[1] ? cantidad[1] + 1 : 1;

    const nuevo = this.programaRepository.create(createProgramaDto);
    nuevo.codigo = ultimo;
    nuevo.activo = true;
    nuevo.estadoId = EstadoEnum.ANIADIDO;
    await this.programaRepository.save(nuevo).catch(e => {
      throw new UnprocessableEntityException(e.message, Message.errorCreate(this.entityNameMessage));
    });

    const responsables = createProgramaDto.responsables;
    responsables.forEach(element => {
      element.programaId = nuevo.id;
    });
    const responsablesGuardados = await this.programaResponsableService.create(responsables);
    nuevo['responsables'] = responsablesGuardados.data;
    return new MessageResponse(HttpStatus.CREATED, MessageEnum.CREATED, nuevo);
  }

  async grabaPonderacion(lista: ListaProgramaDto[]) {
    const TOTAL_PONDERACION = 100;
    let acumulado = 0;
    const todos = await this.programaRepository.find({ where: { activo: true } });

    for (let index = 0; index < todos.length; index++) {
      const programa = todos[index];
      const encontrado = lista.find(uno => uno.id == programa.id);
      if (!encontrado) {
        throw new UnprocessableEntityException(Message.idNotExists({ id: programa.id }));
      }
      acumulado += encontrado.ponderacion;
    }

    if (acumulado != TOTAL_PONDERACION) {
      throw new ConflictException({
        statusCode: HttpStatus.CONFLICT,
        message: MessageEnum.INVALID_PARAMS,
        data: 'suma obligatoria a ' + TOTAL_PONDERACION,
      });
    }

    for (let index = 0; index < lista.length; index++) {
      const elemento = lista[index];

      const actualizar = new ProgramaEntity();
      Object.assign(actualizar, elemento);
      actualizar.estadoId = EstadoEnum.MODIFICADO;
      delete actualizar.id;

      await this.programaRepository.update(elemento.id, actualizar).catch(e => {
        throw new UnprocessableEntityException(e.message, MessageEnum.ERROR_UPDATE);
      });
    }
    return new MessageResponse(HttpStatus.OK, MessageEnum.UPDATED, 'todo');
  }

  async findAll(options: PaginationDto): Promise<MessageResponse<PaginationResult>> {
    const qb = this.programaRepository
      .createQueryBuilder('programa')
      //.leftJoinAndSelect('programa.gestion', 'gestion')
      .where('programa.activo');

    return paginateQuery(qb, options);
  }

  async listar(options: PaginationDto, gestionId: number): Promise<MessageResponse<PaginationResult>> {
    const lista = this.programaRepository
      .createQueryBuilder('programa')
      .leftJoinAndSelect('programa.gestion', 'gestion')
      .where('programa.activo and programa.gestionId = :gestionId', { gestionId })
      .orderBy('programa.codigo', 'ASC');
    return paginateQuery(lista, options);
  }

  async listarParaPonderacion(gestionId: number): Promise<MessageResponse<ProgramaEntity[]>> {
    const lista = await this.programaRepository.find({ where: { gestionId, activo: true }, order: { codigo: 'ASC' } }).catch(e => {
      throw new UnprocessableEntityException(e.message, MessageEnum.UNPROCESSABLE);
    });
    const message = lista.length < 1 ? MessageEnum.ENTITY_SELECT_EMPTY : MessageEnum.ENTITY_SELECT;
    return new MessageResponse(HttpStatus.OK, message, lista);
  }

  async findOne(id: number) {
    const lista = await this.programaRepository
      .createQueryBuilder('programa')
      .leftJoinAndSelect('programa.gestion', 'gestion')
      .where('programa.activo and programa.id = :id', { id })
      .orderBy('programa.codigo', 'ASC')
      .getOne();

    return new MessageResponse(HttpStatus.OK, MessageEnum.ENTITY_SELECT, lista);
  }

  async update(id: number, updateProgramaDto: UpdateProgramaDto) {
    const encontrado = await this.programaRepository.findOneBy({ id, activo: true });
    if (!encontrado) {
      throw new NotFoundException({ message: Message.notExists(this.entityNameMessage, id), data: null });
    }

    Object.assign(encontrado, updateProgramaDto);
    if (updateProgramaDto.codigo) encontrado.codigo = updateProgramaDto.codigo;
    if (updateProgramaDto.descripcion) encontrado.descripcion = updateProgramaDto.descripcion.trim();
    if (updateProgramaDto.ponderacion) encontrado.ponderacion = updateProgramaDto.ponderacion;
    if (updateProgramaDto.metaGlobalPlaneada) encontrado.metaGlobalPlaneada = updateProgramaDto.metaGlobalPlaneada;
    if (updateProgramaDto.gestionId) encontrado.gestionId = updateProgramaDto.gestionId;
    encontrado.estadoId = EstadoEnum.MODIFICADO;
    await this.programaRepository.save(encontrado).catch(e => {
      throw new UnprocessableEntityException(e.message, Message.errorUpdate(this.entityNameMessage));
    });

    return new MessageResponse(HttpStatus.OK, MessageEnum.UPDATED, encontrado);
  }

  async ejecucion(id: number, ejecutarProgramaDto: EjecutarProgramaDto) {
    const encontrado = await this.programaRepository.findOneBy({ id, activo: true });
    if (!encontrado) {
      throw new NotFoundException({ message: Message.notExists(this.entityNameMessage, id), data: null });
    }

    Object.assign(encontrado, ejecutarProgramaDto);
    if (ejecutarProgramaDto.resultado) encontrado.resultado = ejecutarProgramaDto.resultado.trim();
    encontrado.estadoId = EstadoEnum.MODIFICADO;
    await this.programaRepository.save(encontrado).catch(e => {
      throw new UnprocessableEntityException(e.message, Message.errorUpdate(this.entityNameMessage));
    });

    return new MessageResponse(HttpStatus.OK, MessageEnum.UPDATED, encontrado);
  }

  async remove(id: number) {
    const encontrado = await this.programaRepository.findOneBy({ activo: true });
    if (!encontrado) {
      throw new NotFoundException({ message: Message.notExists(this.entityNameMessage, id), data: null });
    }

    await this.programaRepository.update(id, { estadoId: 4, activo: false }).catch(e => {
      throw new UnprocessableEntityException(e.message, Message.errorDelete(this.entityNameMessage));
    });

    return new MessageResponse(HttpStatus.OK, MessageEnum.DELETED, { id });
  }
}
