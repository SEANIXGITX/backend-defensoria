import { HttpStatus, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateOperacionDto } from './dto/create-operacion.dto';
import { UpdateOperacionDto } from './dto/update-operacion.dto';
import { OperacionEntity } from './entities/operacion.entity';
import { MessageResponse } from 'src/shared/entities/message-response';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstadoEnum } from 'src/shared/enums/estado.enum';
import { MessageEnum } from 'src/shared/enums/message.enum';

@Injectable()
export class OperacionService {
  entityNameMessage = 'operacion';

  constructor(@InjectRepository(OperacionEntity) private operacionRepository: Repository<OperacionEntity>) {}

  create(createOperacionDto: CreateOperacionDto) {
    return 'This action adds a new operacion';
  }

  findAll() {
    return `This action returns all operacion`;
  }

  async listar(idUnidad: number): Promise<MessageResponse<OperacionEntity[]>> {
    const lista = await this.operacionRepository
      .createQueryBuilder('operacion')
      .where('operacion.unidadId = :idUnidad', { idUnidad })
      .andWhere('operacion.activo and operacion.estadoId != :borrado', { borrado: EstadoEnum.ELIMINADO })
      .select(['operacion.idOperacion', 'operacion.codigo', 'operacion.descripcion'])
      .getMany()
      .catch(e => {
        throw new UnprocessableEntityException(e.message, MessageEnum.UNPROCESSABLE);
      });
    if (lista.length < 1) {
      return new MessageResponse(HttpStatus.OK, MessageEnum.ENTITY_SELECT_EMPTY, []);
    }
    return new MessageResponse(HttpStatus.OK, MessageEnum.ENTITY_SELECT, lista);
  }

  findOne(id: number) {
    return `This action returns a #${id} operacion`;
  }

  async listaPorProducto(idProducto: number): Promise<MessageResponse<OperacionEntity[]>> {
    const lista = await this.operacionRepository.find({ where: { productoId: idProducto, activo: true }, order: { descripcion: 'DESC' } });
    const message = lista.length > 0 ? MessageEnum.ENTITY_SELECT : MessageEnum.ENTITY_SELECT_EMPTY;
    return new MessageResponse(HttpStatus.OK, message, lista);
  }

  update(id: number, updateOperacionDto: UpdateOperacionDto) {
    return `This action updates a #${id} operacion`;
  }

  remove(id: number) {
    return `This action removes a #${id} operacion`;
  }
}
