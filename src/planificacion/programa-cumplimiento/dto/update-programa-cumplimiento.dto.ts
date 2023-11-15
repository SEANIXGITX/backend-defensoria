import { PartialType } from '@nestjs/swagger';
import { CreateProgramaCumplimientoDto } from './create-programa-cumplimiento.dto';

export class UpdateProgramaCumplimientoDto extends PartialType(CreateProgramaCumplimientoDto) {}
