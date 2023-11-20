import { HttpStatus, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CreateProgramaMetaDto } from './dto/create-programa-meta.dto';
import { UpdateProgramaMetaDto } from './dto/update-programa-meta.dto';
import { ProgramaMetaEntity } from './entities/programa-meta.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { MessageResponse } from 'src/shared/entities/message-response';
import { Message, MessageEnum } from 'src/shared/enums/message.enum';
import { EstadoEnum } from 'src/shared/enums/estado.enum';
import { ProgramaEntity } from '../programa/entities/programa.entity';
import { PeriodoEntity } from 'src/catalogo/periodo/entities/periodo.entity';

@Injectable()
export class ProgramaMetaService {
  entityNameMessage = 'ProgramaMeta';
  entitySecundariaNameMessage = 'Programa';
  entityTersarioNameMessage = 'Periodo';

  constructor(
    @InjectRepository(ProgramaMetaEntity) private programaMetaRepository: Repository<ProgramaMetaEntity>,
    @InjectRepository(ProgramaEntity) private programaRepository: Repository<ProgramaEntity>,
    @InjectRepository(PeriodoEntity) private periodoRepository: Repository<PeriodoEntity>,
  ) {}

  async create(createProgramaMetaDto: CreateProgramaMetaDto[]) {
    let PERIODO_GESTION = 0;
    const META_GLOBAL = 100;
    const periodoEmcontrado = await this.periodoRepository.find({
      where: { codigo: Like(`%${createProgramaMetaDto[0].codigoPeriodo.substring(0, 1)}%`), activo: true },
    });
    if (!periodoEmcontrado) {
      console.error(' NO EXISTE EL  PERIODO');
      throw new NotFoundException({ message: Message.notExists(this.entityTersarioNameMessage, 1) });
    }
    PERIODO_GESTION = periodoEmcontrado.length;
    if (PERIODO_GESTION != createProgramaMetaDto.length) {
      console.error('FALTAN METAS POR PERIODO');
      throw new NotFoundException({ message: Message.notExists(this.entityTersarioNameMessage, 1) });
    }
    const encontrado = await this.programaRepository.findOne({
      where: { id: createProgramaMetaDto[0].programaId, activo: true },
    });
    if (!encontrado) {
      throw new NotFoundException({
        message: Message.notExists(this.entitySecundariaNameMessage, createProgramaMetaDto[0].programaId),
        data: null,
      });
    }
    const existe = await this.programaMetaRepository.findOne({
      where: { programaId: createProgramaMetaDto[0].programaId, codigoPeriodo: createProgramaMetaDto[0].codigoPeriodo, activo: true },
    });
    if (existe) {
      throw new NotFoundException({ message: Message.exists(this.entityNameMessage), data: null });
    }

    const total = createProgramaMetaDto.reduce((acumulador, b) => acumulador + b.metaPlaneada, 0);
    if (total != META_GLOBAL) {
      console.error('LA SUMA TOTAL DE LAS METAS ESTA MAL');
      throw new NotFoundException({
        message: Message.notRequirements(this.entityNameMessage, createProgramaMetaDto[0].programaId),
        data: null,
      });
    }
    for (let index = 0; index < createProgramaMetaDto.length; index++) {
      const item = createProgramaMetaDto[index];
      const nuevo = this.programaMetaRepository.create(item);
      nuevo.activo = true;
      nuevo.estadoId = EstadoEnum.ORIGINAL;
      await this.programaMetaRepository.save(nuevo).catch(e => {
        throw new UnprocessableEntityException(e.message, Message.errorCreate(this.entityNameMessage));
      });
    }

    return new MessageResponse(HttpStatus.CREATED, MessageEnum.CREATED, createProgramaMetaDto);
  }

  findAll() {
    return `This action returns all programaMeta`;
  }

  findOne(id: number) {
    return `This action returns a #${id} programaMeta`;
  }

  update(id: number, updateProgramaMetaDto: UpdateProgramaMetaDto) {
    return `This action updates a #${id} programaMeta`;
  }

  remove(id: number) {
    return `This action removes a #${id} programaMeta`;
  }
}
