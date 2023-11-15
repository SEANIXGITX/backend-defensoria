import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProgramaMetaService } from './programa-meta.service';
import { CreateProgramaMetaDto } from './dto/create-programa-meta.dto';
import { UpdateProgramaMetaDto } from './dto/update-programa-meta.dto';

@Controller('programa-meta')
export class ProgramaMetaController {
  constructor(private readonly programaMetaService: ProgramaMetaService) {}

  @Post()
  create(@Body() createProgramaMetaDto: CreateProgramaMetaDto) {
    return this.programaMetaService.create(createProgramaMetaDto);
  }

  @Get()
  findAll() {
    return this.programaMetaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.programaMetaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProgramaMetaDto: UpdateProgramaMetaDto) {
    return this.programaMetaService.update(+id, updateProgramaMetaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.programaMetaService.remove(+id);
  }
}
