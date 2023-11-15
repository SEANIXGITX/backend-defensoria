import { PartialType } from '@nestjs/swagger';
import { CreateEspecificacionTecnicaDto } from './create-especificacion-tecnica.dto';

export class UpdateEspecificacionTecnicaDto extends PartialType(CreateEspecificacionTecnicaDto) {}
