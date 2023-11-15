import { Injectable } from '@nestjs/common';
import { CreateOperacionMetaDto } from './dto/create-operacion-meta.dto';
import { UpdateOperacionMetaDto } from './dto/update-operacion-meta.dto';

@Injectable()
export class OperacionMetaService {
  create(createOperacionMetaDto: CreateOperacionMetaDto) {
    return 'This action adds a new operacionMeta';
  }

  findAll() {
    return `This action returns all operacionMeta`;
  }

  findOne(id: number) {
    return `This action returns a #${id} operacionMeta`;
  }

  update(id: number, updateOperacionMetaDto: UpdateOperacionMetaDto) {
    return `This action updates a #${id} operacionMeta`;
  }

  remove(id: number) {
    return `This action removes a #${id} operacionMeta`;
  }
}
