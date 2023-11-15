import { Injectable, HttpStatus } from '@nestjs/common';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';
import { MessageEnum } from 'src/shared/enums/message.enum';
import { MessageResponse } from 'src/shared/entities/message-response';
import { ProyectoEntity } from './entities/proyecto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProyectoService {
  constructor(@InjectRepository(ProyectoEntity) private proyectoRepository: Repository<ProyectoEntity>) {}

  create(createProyectoDto: CreateProyectoDto) {
    return 'This action adds a new proyecto';
  }

  findAll() {
    return `This action returns all proyecto`;
  }

  async listaPorPrograma(idPrograma: number) {
    const lista = await this.proyectoRepository.find({ where: { programaId: idPrograma, activo: true }, order: { descripcion: 'DESC' } });
    const message = lista.length > 0 ? MessageEnum.ENTITY_SELECT : MessageEnum.ENTITY_SELECT_EMPTY;
    return new MessageResponse(HttpStatus.OK, message, lista);
  }
  findOne(id: number) {
    return `This action returns a #${id} proyecto`;
  }

  update(id: number, updateProyectoDto: UpdateProyectoDto) {
    return `This action updates a #${id} proyecto`;
  }

  remove(id: number) {
    return `This action removes a #${id} proyecto`;
  }
}
