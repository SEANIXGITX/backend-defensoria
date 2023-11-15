import { PartialType } from '@nestjs/swagger';
import { CreateProgramaMetaDto } from './create-programa-meta.dto';

export class UpdateProgramaMetaDto extends PartialType(CreateProgramaMetaDto) {}
