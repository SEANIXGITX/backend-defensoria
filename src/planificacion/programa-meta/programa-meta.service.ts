import { Injectable } from '@nestjs/common';
import { CreateProgramaMetaDto } from './dto/create-programa-meta.dto';
import { UpdateProgramaMetaDto } from './dto/update-programa-meta.dto';

@Injectable()
export class ProgramaMetaService {
  create(createProgramaMetaDto: CreateProgramaMetaDto) {
    return 'This action adds a new programaMeta';
  }

  findAll() {
    return `This action returns all programaMeta`;
  }

  findOne(id: number) {
    return `This action returns a #${id} programaMeta`;
  }

  update(id: number, updateProgramaMetaDto: UpdateProgramaMetaDto) {
    return `This action updates a #${id} programaMeta`;
  }

  remove(id: number) {
    return `This action removes a #${id} programaMeta`;
  }
}
