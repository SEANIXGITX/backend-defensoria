import { Injectable, UnprocessableEntityException, HttpStatus, NotFoundException } from '@nestjs/common';
import { CreateSolicitudDetalleDto } from './dto/create-solicitud-detalle.dto';
import { UpdateSolicitudDetalleDto } from './dto/update-solicitud-detalle.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SolicitudDetalleEntity } from './entities/solicitud-detalle.entity';
import { Repository } from 'typeorm';
import { Message, MessageEnum } from 'src/shared/enums/message.enum';
import { MessageResponse } from 'src/shared/entities/message-response';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginationResult } from 'src/shared/entities/pagination-result';
import { paginateQuery } from 'src/shared/querys/pagination.query';
import { EstadoEnum } from 'src/shared/enums/estado.enum';

@Injectable()
export class SolicitudDetalleService {
  entityNameMessage = 'Solicitud Detalle';

  constructor(@InjectRepository(SolicitudDetalleEntity) private solicitudDetalleRepository: Repository<SolicitudDetalleEntity>) {}

  async create(createSolDetalleDto: CreateSolicitudDetalleDto): Promise<MessageResponse<SolicitudDetalleEntity>> {
    const encontrado = await this.solicitudDetalleRepository.findOneBy({ solicitudId: createSolDetalleDto.solicitudId }).catch(e => {
      throw new UnprocessableEntityException(e.message, MessageEnum.UNPROCESSABLE);
    });
    if (!encontrado) {
      return new MessageResponse(HttpStatus.NOT_FOUND, MessageEnum.NOT_EXIST, null);
    }
    const nuevo = this.solicitudDetalleRepository.create(createSolDetalleDto);
    nuevo.estadoId = EstadoEnum.ORIGINAL;
    const guardado = await this.solicitudDetalleRepository.save(nuevo).catch(e => {
      throw new UnprocessableEntityException(e.message, Message.errorCreate(this.entityNameMessage));
    });

    return new MessageResponse(HttpStatus.CREATED, MessageEnum.CREATED, guardado);
  }

  async findAll(options: PaginationDto, idSolicitud: number): Promise<MessageResponse<PaginationResult>> {
    const qb = this.solicitudDetalleRepository
      .createQueryBuilder('solicitudDetalle')
      .leftJoinAndSelect('solicitudDetalle.presupuesto', 'presupuesto')
      .leftJoinAndSelect('solicitudDetalle.proveedor', 'proveedor')
      .leftJoinAndSelect('proveedor.tiposServicio', 'tiposServicio')
      .where('solicitudDetalle.solicitudId = :idSolicitud and solicitudDetalle.activo ', { idSolicitud });

    return paginateQuery(qb, options);
  }

  async findOne(id: number) {
    const encontrado = await this.solicitudDetalleRepository
      .createQueryBuilder('solicitudDetalle')
      .leftJoinAndSelect('solicitudDetalle.solicitud', 'solicitud')
      .leftJoinAndSelect('solicitudDetalle.presupuesto', 'presupuesto')
      .leftJoinAndSelect('presupuesto.partida', 'partida')
      .leftJoinAndSelect('presupuesto.operacion', 'operacion')
      .leftJoinAndSelect('solicitudDetalle.proveedor', 'proveedor')
      .leftJoinAndSelect('proveedor.tiposServicio', 'tiposServicio')
      .where('solicitudDetalle.idSolicitudDetalle = :id and solicitudDetalle.activo ', { id })
      .getOne();

    if (!encontrado) {
      throw new NotFoundException({ message: Message.notExists(this.entityNameMessage, id), data: null });
    }
    return new MessageResponse(HttpStatus.OK, MessageEnum.ENTITY_SELECT, encontrado);
  }

  update(id: number, updateSolicitudDetalleDto: UpdateSolicitudDetalleDto) {
    return `This action updates a #${id} solicitudDetalle`;
  }

  remove(id: number) {
    return `This action removes a #${id} solicitudDetalle`;
  }
}
