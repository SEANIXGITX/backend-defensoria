import { HttpStatus, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateIndicadorDto } from './dto/create-indicador.dto';
import { UpdateIndicadorDto } from './dto/update-indicador.dto';
import { MessageResponse } from 'src/shared/entities/message-response';
import { IndicadorEntity } from './entities/indicador.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message, MessageEnum } from 'src/shared/enums/message.enum';

@Injectable()
export class IndicadorService {
  entityNameMessage = 'Indicador';

  constructor(@InjectRepository(IndicadorEntity) private unidadMedidaRepository: Repository<IndicadorEntity>) {}

  create(createIndicadorDto: CreateIndicadorDto) {
    return 'This action adds a new indicador';
  }

  findAll() {
    return `This action returns all indicador`;
  }
  async listar(): Promise<MessageResponse<IndicadorEntity[]>> {
    const lista = await this.unidadMedidaRepository.find({ where: { activo: true }, order: { descripcion: 'ASC' } }).catch(e => {
      throw new UnprocessableEntityException(e.message, Message.errorSelect(this.entityNameMessage));
    });
    if (lista.length < 1) {
      return new MessageResponse(HttpStatus.OK, MessageEnum.ENTITY_SELECT_EMPTY, []);
    }
    return new MessageResponse(HttpStatus.OK, MessageEnum.ENTITY_SELECT, lista);
  }
  findOne(id: number) {
    return `This action returns a #${id} indicador`;
  }

  update(id: number, updateIndicadorDto: UpdateIndicadorDto) {
    return `This action updates a #${id} indicador`;
  }

  remove(id: number) {
    return `This action removes a #${id} indicador`;
  }
}
