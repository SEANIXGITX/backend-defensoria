import { PartialType } from '@nestjs/swagger';
import { CreateSolicitudDetalleEspecificacionTecnicaDto } from './create-solicitud-detalle-especificacion-tecnica.dto';

export class UpdateSolicitudDetalleEspecificacionTecnicaDto extends PartialType(CreateSolicitudDetalleEspecificacionTecnicaDto) {}
