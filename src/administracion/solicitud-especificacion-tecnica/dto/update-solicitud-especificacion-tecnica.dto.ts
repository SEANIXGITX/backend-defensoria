import { PartialType } from '@nestjs/swagger';
import { CreateSolicitudEspecificacionTecnicaDto } from './create-solicitud-especificacion-tecnica.dto';

export class UpdateSolicitudEspecificacionTecnicaDto extends PartialType(CreateSolicitudEspecificacionTecnicaDto) {}
