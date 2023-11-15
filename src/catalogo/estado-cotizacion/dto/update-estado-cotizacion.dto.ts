import { PartialType } from '@nestjs/swagger';
import { CreateEstadoCotizacionDto } from './create-estado-cotizacion.dto';

export class UpdateEstadoCotizacionDto extends PartialType(CreateEstadoCotizacionDto) {}
