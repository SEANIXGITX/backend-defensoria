import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SolicitudEspecificacionTecnicaService } from './solicitud-especificacion-tecnica.service';
import { CreateSolicitudEspecificacionTecnicaDto } from './dto/create-solicitud-especificacion-tecnica.dto';
import { UpdateSolicitudEspecificacionTecnicaDto } from './dto/update-solicitud-especificacion-tecnica.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('solicitudes-especificacion-tecnica')
@ApiTags('solicitudes-especificacion-tecnica')
export class SolicitudEspecificacionTecnicaController {
  constructor(private readonly solicitudEspecificacionTecnicaService: SolicitudEspecificacionTecnicaService) {}

  @Post()
  @ApiOperation({ summary: 'Crea las especificaciones de una solicitud' })
  create(@Body() createSolicitudEspecificacionTecnicaDto: CreateSolicitudEspecificacionTecnicaDto) {
    return this.solicitudEspecificacionTecnicaService.create(createSolicitudEspecificacionTecnicaDto);
  }

  @Get()
  findAll() {
    return this.solicitudEspecificacionTecnicaService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'lista las especificaciones de una solicitud' })
  findOne(@Param('id') id: string) {
    return this.solicitudEspecificacionTecnicaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSolicitudEspecificacionTecnicaDto: UpdateSolicitudEspecificacionTecnicaDto) {
    return this.solicitudEspecificacionTecnicaService.update(+id, updateSolicitudEspecificacionTecnicaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.solicitudEspecificacionTecnicaService.remove(+id);
  }
}
