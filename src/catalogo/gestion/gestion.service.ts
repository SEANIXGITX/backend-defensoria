import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { CreateGestionDto } from './dto/create-gestion.dto';
import { UpdateGestionDto } from './dto/update-gestion.dto';
import { GestionEntity } from './entities/gestion.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstadoEnum } from 'src/shared/enums/estado.enum';
import { MessageResponse } from 'src/shared/entities/message-response';
import { Message, MessageEnum } from 'src/shared/enums/message.enum';

@Injectable()
export class GestionService {
  entityNameMessage = 'Gestion';

  constructor(@InjectRepository(GestionEntity) private getionRepository: Repository<GestionEntity>) {}

  create(createGestionDto: CreateGestionDto) {
    return 'This action adds a new gestion';
  }

  async findAll() {
    const lista = await this.getionRepository
      .createQueryBuilder('gestion')
      .leftJoinAndSelect('gestion.tipoPeriodo', 'tipoPeriodo')
      .where('gestion.activo and gestion.estadoId != :borrado', { borrado: EstadoEnum.ELIMINADO })
      .select(['gestion.id', 'gestion.descripcion', 'gestion.tipoId', 'tipoPeriodo.tipoId', 'tipoPeriodo.codigoTipo'])
      .getMany();

    if (!lista) {
      throw new NotFoundException({ message: MessageEnum.ENTITY_SELECT_EMPTY, data: [] });
    }
    return new MessageResponse(HttpStatus.OK, MessageEnum.ENTITY_SELECT, lista);
  }

  findOne(id: number) {
    return `This action returns a #${id} gestion`;
  }

  update(id: number, updateGestionDto: UpdateGestionDto) {
    return `This action updates a #${id} gestion`;
  }

  remove(id: number) {
    return `This action removes a #${id} gestion`;
  }
}
