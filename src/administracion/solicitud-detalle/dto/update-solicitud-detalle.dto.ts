import { PartialType } from '@nestjs/swagger';
import { CreateSolicitudDetalleDto } from './create-solicitud-detalle.dto';

export class UpdateSolicitudDetalleDto extends PartialType(CreateSolicitudDetalleDto) {}
