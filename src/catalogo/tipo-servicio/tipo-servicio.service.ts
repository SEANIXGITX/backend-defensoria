import { Injectable } from '@nestjs/common';
import { CreateTipoServicioDto } from './dto/create-tipo-servicio.dto';
import { UpdateTipoServicioDto } from './dto/update-tipo-servicio.dto';

@Injectable()
export class TipoServicioService {
  create(createTipoServicioDto: CreateTipoServicioDto) {
    return 'This action adds a new tipoServicio';
  }

  findAll() {
    return `This action returns all tipoServicio`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tipoServicio`;
  }

  update(id: number, updateTipoServicioDto: UpdateTipoServicioDto) {
    return `This action updates a #${id} tipoServicio`;
  }

  remove(id: number) {
    return `This action removes a #${id} tipoServicio`;
  }
}
