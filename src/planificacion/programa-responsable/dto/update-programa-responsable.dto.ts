import { PartialType } from '@nestjs/swagger';
import { CreateProgramaResponsableDto } from './create-programa-responsable.dto';

export class UpdateProgramaResponsableDto extends PartialType(CreateProgramaResponsableDto) {}
