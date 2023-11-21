import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsNumberString, IsOptional, Max, IsString, Matches, MinLength, Min } from 'class-validator';

export class CreateProgramaResponsableDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo programaId no debe ser vacío' })
  @IsNumber({}, { message: 'El campo programaId debe estar definido y ser numérico.' })
  programaId: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo gestionId no debe ser vacío' })
  @IsNumber({}, { message: 'El campo gestionId debe estar definido y ser numérico.' })
  gestionId: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo usuarioId no debe ser vacío' })
  @IsNumber({}, { message: 'El campo usuarioId debe estar definido y ser numérico.' })
  usuarioId: number;
}
