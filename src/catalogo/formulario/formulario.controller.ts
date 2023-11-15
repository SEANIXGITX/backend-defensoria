import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { FormularioService } from './formulario.service';
import { CreateFormularioDto } from './dto/create-formulario.dto';
import { UpdateFormularioDto } from './dto/update-formulario.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('formularios')
@ApiTags('formularios')
export class FormularioController {
  constructor(private readonly formularioService: FormularioService) {}

  @Post()
  create(@Body() createFormularioDto: CreateFormularioDto) {
    return this.formularioService.create(createFormularioDto);
  }

  @Get()
  findAll() {
    return this.formularioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formularioService.findOne(+id);
  }

  @Get('uno/:codigoFormulario')
  listaFormulario(@Param('codigoFormulario', ParseIntPipe) codigoFormulario: number) {
    return this.formularioService.listarColumnas(codigoFormulario);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFormularioDto: UpdateFormularioDto) {
    return this.formularioService.update(+id, updateFormularioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.formularioService.remove(+id);
  }
}
