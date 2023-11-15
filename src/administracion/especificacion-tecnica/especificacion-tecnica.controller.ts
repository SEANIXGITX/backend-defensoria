import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode, ParseIntPipe } from '@nestjs/common';
import { EspecificacionTecnicaService } from './especificacion-tecnica.service';
import { CreateEspecificacionTecnicaDto } from './dto/create-especificacion-tecnica.dto';
import { UpdateEspecificacionTecnicaDto } from './dto/update-especificacion-tecnica.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiExtraMessageResponse } from 'src/shared/decorators/api-message-response.decorator';

@Controller('especificaciones-tecnica')
@ApiTags('especificaciones-tecnica')
export class EspecificacionTecnicaController {
  constructor(private readonly especificacionTecnicaService: EspecificacionTecnicaService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crea una nueva especificacion tecnica para una solicitud' })
  create(@Body() createEspecificacionTecnicaDto: CreateEspecificacionTecnicaDto) {
    return this.especificacionTecnicaService.create(createEspecificacionTecnicaDto);
  }

  @Get()
  findAll() {
    return this.especificacionTecnicaService.findAll();
  }

  @Get(':solicitudId')
  @ApiOperation({ summary: 'Obtiene las especificaciones tecnicas de una Solicitud' })
  @ApiExtraMessageResponse([HttpStatus.NOT_FOUND])
  findOne(@Param('solicitudId', ParseIntPipe) solicitudId: string) {
    return this.especificacionTecnicaService.findOne(+solicitudId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEspecificacionTecnicaDto: UpdateEspecificacionTecnicaDto) {
    return this.especificacionTecnicaService.update(+id, updateEspecificacionTecnicaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.especificacionTecnicaService.remove(+id);
  }
}
