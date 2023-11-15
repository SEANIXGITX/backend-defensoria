import { Injectable, UnprocessableEntityException, HttpStatus } from '@nestjs/common';
import { CreateTipoSolicitudDto } from './dto/create-tipo-solicitud.dto';
import { UpdateTipoSolicitudDto } from './dto/update-tipo-solicitud.dto';
import { TipoSolicitudEntity } from './entities/tipo-solicitud.entity';
import { MessageResponse } from 'src/shared/entities/message-response';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message, MessageEnum } from 'src/shared/enums/message.enum';

@Injectable()
export class TipoSolicitudService {
  entityNameMessage = 'Tipos solicitudes';

  constructor(@InjectRepository(TipoSolicitudEntity) private tipoSolicitudRepository: Repository<TipoSolicitudEntity>) {}

  create(createTipoSolicitudDto: CreateTipoSolicitudDto) {
    return 'This action adds a new tipoSolicitud';
  }

  findAll() {
    return `This action returns all tipoSolicitud`;
  }

  async listar(): Promise<MessageResponse<TipoSolicitudEntity[]>> {
    const lista = await this.tipoSolicitudRepository.find({ where: { activo: true }, order: { descripcion: 'ASC' } }).catch(e => {
      throw new UnprocessableEntityException(e.message, Message.errorSelect(this.entityNameMessage));
    });
    if (lista.length < 1) {
      return new MessageResponse(HttpStatus.OK, MessageEnum.ENTITY_SELECT_EMPTY, []);
    }
    return new MessageResponse(HttpStatus.OK, MessageEnum.ENTITY_SELECT, lista);
  }

  findOne(id: number) {
    return `This action returns a #${id} tipoSolicitud`;
  }

  update(id: number, updateTipoSolicitudDto: UpdateTipoSolicitudDto) {
    return `This action updates a #${id} tipoSolicitud`;
  }

  remove(id: number) {
    return `This action removes a #${id} tipoSolicitud`;
  }
}
