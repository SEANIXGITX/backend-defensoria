import { Injectable } from '@nestjs/common';
import { CreateProgramaIncumplimientoDto } from './dto/create-programa-incumplimiento.dto';
import { UpdateProgramaIncumplimientoDto } from './dto/update-programa-incumplimiento.dto';

@Injectable()
export class ProgramaIncumplimientoService {
  create(createProgramaIncumplimientoDto: CreateProgramaIncumplimientoDto) {
    return 'This action adds a new programaIncumplimiento';
  }

  findAll() {
    return `This action returns all programaIncumplimiento`;
  }

  findOne(id: number) {
    return `This action returns a #${id} programaIncumplimiento`;
  }

  update(id: number, updateProgramaIncumplimientoDto: UpdateProgramaIncumplimientoDto) {
    return `This action updates a #${id} programaIncumplimiento`;
  }

  remove(id: number) {
    return `This action removes a #${id} programaIncumplimiento`;
  }
}
