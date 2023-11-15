import { Injectable, UnprocessableEntityException, HttpStatus } from '@nestjs/common';
import { CreatePartidaDto } from './dto/create-partida.dto';
import { UpdatePartidaDto } from './dto/update-partida.dto';
import { MessageResponse } from 'src/shared/entities/message-response';
import { PartidaEntity } from './entities/partida.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstadoEnum } from 'src/shared/enums/estado.enum';
import { MessageEnum } from 'src/shared/enums/message.enum';
import { PresupuestoEntity } from 'src/ppto/presupuesto/entities/presupuesto.entity';

@Injectable()
export class PartidaService {
  entityNameMessage = 'Partidas';

  constructor(
    @InjectRepository(PartidaEntity) private partidaRepository: Repository<PartidaEntity>,
    @InjectRepository(PresupuestoEntity) private pptoRepository: Repository<PresupuestoEntity>,
  ) {}

  create(createPartidaDto: CreatePartidaDto) {
    return 'This action adds a new partida';
  }

  findAll() {
    return `This action returns all partida`;
  }

  findOne(id: number) {
    return `This action returns a #${id} partida`;
  }

  async listaPorPartida(idOperacion: number): Promise<MessageResponse<PresupuestoEntity[]>> {
    const lista = await this.pptoRepository
      .createQueryBuilder('ppto')
      .leftJoinAndSelect('ppto.partida', 'partida')
      .where('ppto.operacionId = :idOperacion', { idOperacion })
      .andWhere('ppto.activo and ppto.activo and ppto.estadoId != :borrado', { borrado: EstadoEnum.ELIMINADO })
      .select([
        'ppto.idPresupuesto',
        'ppto.operacionId',
        'partida.idPartida',
        'partida.codigo',
        'partida.descripcion',
        'ppto.montoAprobado',
      ])
      .getMany()
      .catch(e => {
        throw new UnprocessableEntityException(e.message, MessageEnum.UNPROCESSABLE);
      });
    if (lista.length < 1) {
      return new MessageResponse(HttpStatus.OK, MessageEnum.ENTITY_SELECT_EMPTY, []);
    }
    return new MessageResponse(HttpStatus.OK, MessageEnum.ENTITY_SELECT, lista);
  }

  update(id: number, updatePartidaDto: UpdatePartidaDto) {
    return `This action updates a #${id} partida`;
  }

  remove(id: number) {
    return `This action removes a #${id} partida`;
  }
}
