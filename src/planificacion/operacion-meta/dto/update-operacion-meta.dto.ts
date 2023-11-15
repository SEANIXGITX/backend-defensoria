import { PartialType } from '@nestjs/swagger';
import { CreateOperacionMetaDto } from './create-operacion-meta.dto';

export class UpdateOperacionMetaDto extends PartialType(CreateOperacionMetaDto) {}
