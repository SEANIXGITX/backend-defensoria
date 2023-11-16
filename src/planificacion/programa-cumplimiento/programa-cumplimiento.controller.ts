import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProgramaCumplimientoService } from './programa-cumplimiento.service';
import { CreateProgramaCumplimientoDto } from './dto/create-programa-cumplimiento.dto';
import { UpdateProgramaCumplimientoDto } from './dto/update-programa-cumplimiento.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('programas-cumplimiento')
@ApiTags('programas-cumplimiento')
export class ProgramaCumplimientoController {
  constructor(private readonly programaCumplimientoService: ProgramaCumplimientoService) {}

  @Post()
  create(@Body() createProgramaCumplimientoDto: CreateProgramaCumplimientoDto) {
    return this.programaCumplimientoService.create(createProgramaCumplimientoDto);
  }

  @Get()
  findAll() {
    return this.programaCumplimientoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.programaCumplimientoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProgramaCumplimientoDto: UpdateProgramaCumplimientoDto) {
    return this.programaCumplimientoService.update(+id, updateProgramaCumplimientoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.programaCumplimientoService.remove(+id);
  }
}
