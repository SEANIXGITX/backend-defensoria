import { PartialType } from '@nestjs/swagger';
import { CreateOperacionObservacionDto } from './create-operacion-observacion.dto';

export class UpdateOperacionObservacionDto extends PartialType(CreateOperacionObservacionDto) {}
