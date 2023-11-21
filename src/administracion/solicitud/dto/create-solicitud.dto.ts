import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, Matches, MinLength } from 'class-validator';

export class CreateSolicitudDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo gestionId no debe ser vacío' })
  @IsNumber({}, { message: 'El campo gestionId debe estar definido y ser numérico.' })
  gestionId: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo procesoId no debe ser vacío' })
  @IsNumber({}, { message: 'El campo procesoId debe estar definido y ser numérico.' })
  procesoId: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo tipoSolicitudId no debe ser vacío' })
  @IsNumber({}, { message: 'El campo tipoSolicitudId debe estar definido y ser numérico.' })
  tipoSolicitudId: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber({}, { message: 'El campo tipoContratacionId debe estar definido y ser numérico.' })
  tipoContratacionId: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber({}, { message: 'El campo tipoAdjudicacionId debe estar definido y ser numérico.' })
  tipoAdjudicacionId: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo identificador de unidad del solicitante no debe ser vacío' })
  @IsNumber({}, { message: 'El campo identificador de unidad del solicitante debe estar definido y ser numérico.' })
  unidadId: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo usuarioId no debe ser vacío' })
  @IsNumber({}, { message: 'El campo usuarioId debe estar definido y ser numérico.' })
  usuarioId: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo Objeto de Contratacion no debe ser vacío' })
  @IsString({ message: 'El campo Objeto de Contratacion debe ser de tipo cadena' })
  @MinLength(4, { message: 'El campo Objeto de Contratacion es menor a 4 caracteres' })
  @Matches(/^(?!\s)[a-zA-Z\u00C0-\u017F\--\d\s]+[^\s]$/, {
    message: 'El campo Objeto de Contratacion admite sólo letras, número y letras acentuadas',
  })
  readonly objetoContratacion: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo Justificacion no debe ser vacío' })
  @IsString({ message: 'El campo Justificacion debe ser de tipo cadena' })
  @MinLength(4, { message: 'El campo Justificacion es menor a 4 caracteres' })
  @Matches(/^(?!\s)[a-zA-Z\u00C0-\u017F\--\d\s]+[^\s]$/, {
    message: 'El campo Justificacion admite sólo letras, número y letras acentuadas',
  })
  readonly justificacion: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  requeridoPara: Date;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  fechaCertificacion: Date;

  @ApiProperty()
  @IsOptional()
  @IsNumber({}, { message: 'El campo nroCertificacion debe estar definido y ser numérico.' })
  nroCertificacion: number;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'El campo devolucion debe ser de tipo cadena' })
  @MinLength(4, { message: 'El campo devolucion es menor a 4 caracteres' })
  @Matches(/^(?!\s)[a-zA-Z\u00C0-\u017F\--\d\s]+[^\s]$/, { message: 'El campo devolucion admite sólo letras, número y letras acentuadas' })
  devolucion: string;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'El campo cuce debe ser de tipo cadena' })
  @MinLength(4, { message: 'El campo cuce es menor a 4 caracteres' })
  @Matches(/^(?!\s)[a-zA-Z\u00C0-\u017F\--\d\s]+[^\s]$/, { message: 'El campo cuce admite sólo letras, número y letras acentuadas' })
  cuce: string;
}
