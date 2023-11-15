import { Injectable } from '@nestjs/common';
import { CreateProgramaCumplimientoDto } from './dto/create-programa-cumplimiento.dto';
import { UpdateProgramaCumplimientoDto } from './dto/update-programa-cumplimiento.dto';

@Injectable()
export class ProgramaCumplimientoService {
  create(createProgramaCumplimientoDto: CreateProgramaCumplimientoDto) {
    return 'This action adds a new programaCumplimiento';
  }

  findAll() {
    return `This action returns all programaCumplimiento`;
  }

  findOne(id: number) {
    return `This action returns a #${id} programaCumplimiento`;
  }

  update(id: number, updateProgramaCumplimientoDto: UpdateProgramaCumplimientoDto) {
    return `This action updates a #${id} programaCumplimiento`;
  }

  remove(id: number) {
    return `This action removes a #${id} programaCumplimiento`;
  }
}
