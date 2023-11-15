import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProgramaIncumplimientoService } from './programa-incumplimiento.service';
import { CreateProgramaIncumplimientoDto } from './dto/create-programa-incumplimiento.dto';
import { UpdateProgramaIncumplimientoDto } from './dto/update-programa-incumplimiento.dto';

@Controller('programa-incumplimiento')
export class ProgramaIncumplimientoController {
  constructor(private readonly programaIncumplimientoService: ProgramaIncumplimientoService) {}

  @Post()
  create(@Body() createProgramaIncumplimientoDto: CreateProgramaIncumplimientoDto) {
    return this.programaIncumplimientoService.create(createProgramaIncumplimientoDto);
  }

  @Get()
  findAll() {
    return this.programaIncumplimientoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.programaIncumplimientoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProgramaIncumplimientoDto: UpdateProgramaIncumplimientoDto) {
    return this.programaIncumplimientoService.update(+id, updateProgramaIncumplimientoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.programaIncumplimientoService.remove(+id);
  }
}
