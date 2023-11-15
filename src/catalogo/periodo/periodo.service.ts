import { HttpStatus, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CreatePeriodoDto } from './dto/create-periodo.dto';
import { UpdatePeriodoDto } from './dto/update-periodo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PeriodoEntity } from './entities/periodo.entity';
import { Repository } from 'typeorm';
import { Message, MessageEnum } from 'src/shared/enums/message.enum';
import { MessageResponse } from 'src/shared/entities/message-response';
import { paginateQuery } from 'src/shared/querys/pagination.query';
import { PaginationDto } from 'src/shared/dto/pagination.dto';

@Injectable()
export class PeriodoService {
  entityNameMessage = 'Periodo';

  constructor(@InjectRepository(PeriodoEntity) private periodoRepository: Repository<PeriodoEntity>) {}

  create(createPeriodoDto: CreatePeriodoDto) {
    return 'This action adds a new periodo';
  }

  async findAll(options: PaginationDto) {
    const lista = this.periodoRepository.createQueryBuilder('periodo').where('periodo.activo');
    return paginateQuery(lista, options);
  }

  findOne(id: number) {
    return `This action returns a #${id} periodo`;
  }

  async listaPorTipo(tipoId: number) {
    const encontrado = await this.periodoRepository.findOneBy({ tipoId, activo: true });
    if (!encontrado) {
      throw new NotFoundException({ message: Message.notExists(this.entityNameMessage, tipoId), data: null });
    }

    const listado = await this.periodoRepository.find({ where: { tipoId: tipoId, activo: true }, order: { codigo: 'ASC' } }).catch(e => {
      throw new UnprocessableEntityException(e.message, Message.errorDelete(this.entityNameMessage));
    });

    return new MessageResponse(HttpStatus.OK, MessageEnum.ENTITY_SELECT, listado);
  }

  update(id: number, updatePeriodoDto: UpdatePeriodoDto) {
    return `This action updates a #${id} periodo`;
  }

  remove(id: number) {
    return `This action removes a #${id} periodo`;
  }
}
