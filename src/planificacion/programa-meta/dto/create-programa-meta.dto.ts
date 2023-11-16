import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, MAX, Matches, Max, MinLength } from 'class-validator';

export class CreateProgramaMetaDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo programaId no debe ser vacío' })
  @IsNumber({}, { message: 'El campo programaId debe estar definido y ser numérico.' })
  programaId: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo codigo Periodo no debe ser vacío' })
  @IsString({ message: 'El campo codigo Periodo debe ser de tipo cadena' })
  @MinLength(2, { message: 'El campo codigo Periodo es menor a 2 caracteres' })
  @Matches(/^(?!\s)[a-zA-Z\u00C0-\u017F\--\d\s]+[^\s]$/, {
    message: 'El campo codigo Periodo admite sólo letras, número y letras acentuadas',
  })
  readonly codigoPeriodo: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo metaPlaneada no debe ser vacío' })
  @IsNumber({}, { message: 'El campo metaPlaneada debe estar definido y ser numérico.' })
  @Max(100, { message: 'El campo  meta Planeada  debe ser igual o menor a 100' })
  metaPlaneada: number;
}
