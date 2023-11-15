import { Injectable, UnprocessableEntityException, HttpStatus, NotFoundException } from '@nestjs/common';
import { CreateCotizacionDto } from './dto/create-cotizacion.dto';
import { UpdateCotizacionDto } from './dto/update-cotizacion.dto';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { CotizacionEntity } from './entities/cotizacion.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationResult } from 'src/shared/entities/pagination-result';
import { MessageResponse } from 'src/shared/entities/message-response';
import { paginateQuery } from 'src/shared/querys/pagination.query';
import { EstadoEnum } from 'src/shared/enums/estado.enum';
import { Message, MessageEnum } from 'src/shared/enums/message.enum';

@Injectable()
export class CotizacionService {
  entityNameMessage = 'Cotizacion';

  constructor(@InjectRepository(CotizacionEntity) private cotizacionRepository: Repository<CotizacionEntity>) {}

  async create(createCotizacionDto: CreateCotizacionDto) {
    const nuevo = this.cotizacionRepository.create(createCotizacionDto);
    nuevo.estadoId = EstadoEnum.ORIGINAL;

    const guardado = await this.cotizacionRepository.save(nuevo).catch(e => {
      throw new UnprocessableEntityException(e.message, Message.errorCreate(this.entityNameMessage));
    });

    return new MessageResponse(HttpStatus.CREATED, MessageEnum.CREATED, guardado);
  }

  findAll() {
    return `This action returns all cotizacion`;
  }

  async listaPorSolicitud(options: PaginationDto, solicitudId: number): Promise<MessageResponse<PaginationResult>> {
    const qb = this.cotizacionRepository
      .createQueryBuilder('cotizacion')
      .leftJoinAndSelect('cotizacion.estadoCoti', 'estadoCoti')
      .where('cotizacion.activo and cotizacion.solicitudId = :solicitudId', { solicitudId })
      .orderBy('cotizacion.id', 'ASC');

    return paginateQuery(qb, options);
  }

  async findOne(id: number) {
    const encontrado = await this.cotizacionRepository
      .createQueryBuilder('cotizacion')
      .leftJoinAndSelect('cotizacion.estadoCoti', 'estadoCoti')
      .where('cotizacion.activo and cotizacion.estadoId != :borrado', { borrado: EstadoEnum.ELIMINADO })
      .andWhere('cotizacion.id = :id ', { id })
      .getOne();
    if (!encontrado) {
      throw new NotFoundException({ message: Message.notExists(this.entityNameMessage, id), data: null });
    }
    return new MessageResponse(HttpStatus.OK, MessageEnum.ENTITY_SELECT, encontrado);
  }

  async update(id: number, updateCotizacionDto: UpdateCotizacionDto) {
    const encontrado = (await this.findOne(id)).data;
    if (!encontrado) {
      throw new NotFoundException({ message: Message.notExists(this.entityNameMessage, id), data: null });
    }

    Object.assign(encontrado, updateCotizacionDto);
    if (updateCotizacionDto.nombreOfertante) encontrado.nombreOfertante = updateCotizacionDto.nombreOfertante.trim();
    if (updateCotizacionDto.fecha) encontrado.fecha = updateCotizacionDto.fecha;
    if (updateCotizacionDto.monto) encontrado.monto = updateCotizacionDto.monto;
    if (updateCotizacionDto.estadoCotizacionId) encontrado.estadoCotizacionId = updateCotizacionDto.estadoCotizacionId;
    encontrado.estadoId = EstadoEnum.MODIFICADO;
    await this.cotizacionRepository.save(encontrado).catch(e => {
      throw new UnprocessableEntityException(e.message, Message.errorUpdate(this.entityNameMessage));
    });

    return new MessageResponse(HttpStatus.OK, MessageEnum.UPDATED, encontrado);
  }

  remove(id: number) {
    return `This action removes a #${id} cotizacion`;
  }
}
