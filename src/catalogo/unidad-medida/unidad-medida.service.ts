import { Injectable, UnprocessableEntityException, HttpStatus, NotFoundException } from '@nestjs/common';
import { CreateUnidadMedidaDto } from './dto/create-unidad-medida.dto';
import { UpdateUnidadMedidaDto } from './dto/update-unidad-medida.dto';
import { MessageResponse } from 'src/shared/entities/message-response';
import { UnidadMedidaEntity } from './entities/unidad-medida.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message, MessageEnum } from 'src/shared/enums/message.enum';
import { EstadoEnum } from 'src/shared/enums/estado.enum';

@Injectable()
export class UnidadMedidaService {
  entityNameMessage = 'Unidad Medida';

  constructor(@InjectRepository(UnidadMedidaEntity) private unidadMedidaRepository: Repository<UnidadMedidaEntity>) {}

  create(createUnidadMedidaDto: CreateUnidadMedidaDto) {
    return 'This action adds a new unidadMedida';
  }

  findAll() {
    return `This action returns all unidadMedida`;
  }

  async listar(): Promise<MessageResponse<UnidadMedidaEntity[]>> {
    const lista = await this.unidadMedidaRepository.find({ where: { activo: true }, order: { descripcion: 'ASC' } }).catch(e => {
      throw new UnprocessableEntityException(e.message, Message.errorSelect(this.entityNameMessage));
    });
    if (lista.length < 1) {
      return new MessageResponse(HttpStatus.OK, MessageEnum.ENTITY_SELECT_EMPTY, []);
    }
    return new MessageResponse(HttpStatus.OK, MessageEnum.ENTITY_SELECT, lista);
  }

  async findOne(idUnidadMedida: number) {
    const encontrado = await this.unidadMedidaRepository.findOne({ where: { idUnidadMedida, activo: true } }).catch(e => {
      throw new UnprocessableEntityException(e.message, Message.errorSelect(this.entityNameMessage));
    });
    if (!encontrado) {
      return new MessageResponse(HttpStatus.OK, MessageEnum.ENTITY_SELECT_EMPTY, null);
    }
    return new MessageResponse(HttpStatus.OK, MessageEnum.ENTITY_SELECT, encontrado);
  }

  update(id: number, updateUnidadMedidaDto: UpdateUnidadMedidaDto) {
    return `This action updates a #${id} unidadMedida`;
  }

  async remove(idUnidadMedida: number): Promise<MessageResponse<{ idUnidadMedida: number }>> {
    const encontrado = await this.unidadMedidaRepository.findOneBy({ idUnidadMedida, activo: true });
    if (!encontrado) {
      throw new NotFoundException({ message: Message.notExists(this.entityNameMessage, idUnidadMedida), data: null });
    }

    await this.unidadMedidaRepository.update(idUnidadMedida, { estadoId: EstadoEnum.ELIMINADO, activo: false }).catch(e => {
      throw new UnprocessableEntityException(e.message, Message.errorDelete(this.entityNameMessage));
    });

    return new MessageResponse(HttpStatus.OK, MessageEnum.DELETED, { idUnidadMedida });
  }
}
