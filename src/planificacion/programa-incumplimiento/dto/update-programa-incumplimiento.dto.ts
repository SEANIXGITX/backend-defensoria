import { PartialType } from '@nestjs/swagger';
import { CreateProgramaIncumplimientoDto } from './create-programa-incumplimiento.dto';

export class UpdateProgramaIncumplimientoDto extends PartialType(CreateProgramaIncumplimientoDto) {}
