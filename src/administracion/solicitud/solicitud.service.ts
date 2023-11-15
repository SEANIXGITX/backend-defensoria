import { Injectable, UnprocessableEntityException, HttpStatus, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSolicitudDto } from './dto/create-solicitud.dto';
import { UpdateSolicitudDto } from './dto/update-solicitud.dto';
import { SolicitudEntity } from './entities/solicitud.entity';
import { MessageResponse } from 'src/shared/entities/message-response';
import { Message, MessageEnum } from 'src/shared/enums/message.enum';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginationResult } from 'src/shared/entities/pagination-result';
import { paginateQuery } from 'src/shared/querys/pagination.query';
import { EstadoEnum } from 'src/shared/enums/estado.enum';

@Injectable()
export class SolicitudService {
  entityNameMessage = 'Solicitud';

  constructor(@InjectRepository(SolicitudEntity) private solicitudRepository: Repository<SolicitudEntity>) {}

  async create(createSolicitudDto: CreateSolicitudDto): Promise<MessageResponse<SolicitudEntity>> {
    let ultimo = 0;
    const cantidad = await this.solicitudRepository.findOne({ where: { activo: true }, order: { idSolicitud: 'DESC' } });
    ultimo = cantidad.nroSolicitud ? cantidad.nroSolicitud + 1 : 1;

    const nuevo = this.solicitudRepository.create(createSolicitudDto);
    nuevo.nroSolicitud = ultimo;
    nuevo.fechaRegistro = new Date();
    nuevo.estadoId = EstadoEnum.ORIGINAL;

    const guardado = await this.solicitudRepository.save(nuevo).catch(e => {
      throw new UnprocessableEntityException(e.message, Message.errorCreate(this.entityNameMessage));
    });

    return new MessageResponse(HttpStatus.CREATED, MessageEnum.CREATED, guardado);
  }

  async findAll(options: PaginationDto, idTipoSolicitud: number): Promise<MessageResponse<PaginationResult>> {
    const qb = this.solicitudRepository
      .createQueryBuilder('solicitud')
      .leftJoinAndSelect('solicitud.tipoSolicitud', 'ts')
      .leftJoinAndSelect('solicitud.gestion', 'gestion')
      .where('solicitud.activo and solicitud.tipoSolicitud = :tipoSolicitudId', { tipoSolicitudId: idTipoSolicitud });

    return paginateQuery(qb, options);
  }

  async findOne(id: number): Promise<MessageResponse<SolicitudEntity>> {
    const encontrado = await this.solicitudRepository
      .createQueryBuilder('solicitud')
      .leftJoinAndSelect('solicitud.detalle', 'detalle')
      .where('solicitud.activo and solicitud.estadoId != :borrado', { borrado: EstadoEnum.ELIMINADO })
      .andWhere('solicitud.idSolicitud = :id ', { id })
      .getOne();

    if (!encontrado) {
      throw new NotFoundException({ message: Message.notExists(this.entityNameMessage, id), data: null });
    }
    return new MessageResponse(HttpStatus.OK, MessageEnum.ENTITY_SELECT, encontrado);
  }

  async update(idSolicitud: number, updateSolicitudDto: UpdateSolicitudDto) {
    const encontrado = await this.solicitudRepository.findOneBy({ idSolicitud, activo: true });
    if (!encontrado) {
      throw new NotFoundException({ message: Message.notExists(this.entityNameMessage, idSolicitud), data: null });
    }

    Object.assign(encontrado, updateSolicitudDto);
    if (updateSolicitudDto.objetoContratacion) encontrado.objetoContratacion = updateSolicitudDto.objetoContratacion.trim();
    if (updateSolicitudDto.justificacion) encontrado.justificacion = updateSolicitudDto.justificacion.trim();
    if (updateSolicitudDto.cuce) encontrado.cuce = updateSolicitudDto.cuce.trim();
    if (updateSolicitudDto.gestionId) encontrado.gestionId = updateSolicitudDto.gestionId;
    encontrado.estadoId = EstadoEnum.MODIFICADO;
    await this.solicitudRepository.save(encontrado).catch(e => {
      throw new UnprocessableEntityException(e.message, Message.errorUpdate(this.entityNameMessage));
    });

    return new MessageResponse(HttpStatus.OK, MessageEnum.UPDATED, encontrado);
  }

  async remove(idSolicitud: number): Promise<MessageResponse<{ idSolicitud: number }>> {
    const encontrado = await this.solicitudRepository.findOneBy({ idSolicitud, activo: true });
    if (!encontrado) {
      throw new NotFoundException({ message: Message.notExists(this.entityNameMessage, idSolicitud), data: null });
    }

    await this.solicitudRepository.update(idSolicitud, { estadoId: 4, activo: false }).catch(e => {
      throw new UnprocessableEntityException(e.message, Message.errorDelete(this.entityNameMessage));
    });

    return new MessageResponse(HttpStatus.OK, MessageEnum.DELETED, { idSolicitud: idSolicitud });
  }
}
