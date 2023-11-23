import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SolicitudDetalleEspecificacionTecnicaService } from './solicitud-detalle-especificacion-tecnica.service';
import { CreateSolicitudDetalleEspecificacionTecnicaDto } from './dto/create-solicitud-detalle-especificacion-tecnica.dto';
import { UpdateSolicitudDetalleEspecificacionTecnicaDto } from './dto/update-solicitud-detalle-especificacion-tecnica.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('solicitudes-detalle-especificacion-tecnica')
@ApiTags('solicitudes-detalle-especificacion-tecnica')
export class SolicitudDetalleEspecificacionTecnicaController {
  constructor(private readonly solicitudDetalleEspecificacionTecnicaService: SolicitudDetalleEspecificacionTecnicaService) {}
}
