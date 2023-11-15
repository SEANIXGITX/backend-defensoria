import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpStatus } from '@nestjs/common';
import { ProyectoService } from './proyecto.service';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiExtraMessageResponse, ApiMessageResponse } from 'src/shared/decorators/api-message-response.decorator';
import { MessageEnum } from 'src/shared/enums/message.enum';
import { ProyectoEntity } from './entities/proyecto.entity';

@Controller('proyectos')
@ApiTags('Proyectos')
export class ProyectoController {
  constructor(private readonly proyectoService: ProyectoService) {}

  @Post()
  create(@Body() createProyectoDto: CreateProyectoDto) {
    return this.proyectoService.create(createProyectoDto);
  }

  @Get()
  findAll() {
    return this.proyectoService.findAll();
  }

  @Get('/programa/:idPrograma')
  @ApiOperation({ summary: 'Listado de proyectos por identificador de programa' })
  @ApiMessageResponse({ status: HttpStatus.OK, description: MessageEnum.ENTITY_SELECT, model: ProyectoEntity })
  @ApiExtraMessageResponse([HttpStatus.NOT_FOUND])
  lista(@Param('idPrograma', ParseIntPipe) idPrograma: number) {
    return this.proyectoService.listaPorPrograma(idPrograma);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.proyectoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProyectoDto: UpdateProyectoDto) {
    return this.proyectoService.update(+id, updateProyectoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.proyectoService.remove(+id);
  }
}
