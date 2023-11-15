import { Injectable } from '@nestjs/common';
import { CreateEstadoCotizacionDto } from './dto/create-estado-cotizacion.dto';
import { UpdateEstadoCotizacionDto } from './dto/update-estado-cotizacion.dto';

@Injectable()
export class EstadoCotizacionService {
  create(createEstadoCotizacionDto: CreateEstadoCotizacionDto) {
    return 'This action adds a new estadoCotizacion';
  }

  findAll() {
    return `This action returns all estadoCotizacion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} estadoCotizacion`;
  }

  update(id: number, updateEstadoCotizacionDto: UpdateEstadoCotizacionDto) {
    return `This action updates a #${id} estadoCotizacion`;
  }

  remove(id: number) {
    return `This action removes a #${id} estadoCotizacion`;
  }
}
