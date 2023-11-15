import { Injectable } from '@nestjs/common';
import { CreateOperacionObservacionDto } from './dto/create-operacion-observacion.dto';
import { UpdateOperacionObservacionDto } from './dto/update-operacion-observacion.dto';

@Injectable()
export class OperacionObservacionService {
  create(createOperacionObservacionDto: CreateOperacionObservacionDto) {
    return 'This action adds a new operacionObservacion';
  }

  findAll() {
    return `This action returns all operacionObservacion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} operacionObservacion`;
  }

  update(id: number, updateOperacionObservacionDto: UpdateOperacionObservacionDto) {
    return `This action updates a #${id} operacionObservacion`;
  }

  remove(id: number) {
    return `This action removes a #${id} operacionObservacion`;
  }
}
