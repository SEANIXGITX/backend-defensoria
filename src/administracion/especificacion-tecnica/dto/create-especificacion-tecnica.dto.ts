import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, Matches, MinLength } from 'class-validator';

export class CreateEspecificacionTecnicaDto {

  
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo solicitudId no debe ser vacío' })
  @IsNumber({}, { message: 'El campo solicitudId debe ser de tipo numerico' })
  solicitudId: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo Objeto de Contratacion no debe ser vacío' })
  @IsString({ message: 'El campo Objeto de Contratacion debe ser de tipo cadena' })
  @MinLength(4, { message: 'El campo Objeto de Contratacion es menor a 4 caracteres' })
  @Matches(/^(?!\s)[a-zA-Z\u00C0-\u017F\--\d\s]+[^\s]$/, {
    message: 'El campo Objeto de Contratacion admite sólo letras, número y letras acentuadas',
  })
  readonly objeto: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo caracteristicas no debe ser vacío' })
  @IsString({ message: 'El campo caracteristicas debe ser de tipo cadena' })
  @MinLength(4, { message: 'El campo caracteristicas es menor a 4 caracteres' })
  @Matches(/^(?!\s)[a-zA-Z\u00C0-\u017F\--\d\s]+[^\s]$/, {
    message: 'El campo caracteristicas admite sólo letras, número y letras acentuadas',
  })
  readonly caracteristicas: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo cantidad no debe ser vacío' })
  @IsNumber({}, { message: 'El campo cantidad debe ser de tipo numerico' })
  readonly cantidad: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo tamanio no debe ser vacío' })
  @IsNumber({}, { message: 'El campo tamanio debe ser de tipo numerico' })
  readonly tamanio: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo material no debe ser vacío' })
  @IsString({ message: 'El campo material debe ser de tipo cadena' })
  @MinLength(4, { message: 'El campo material es menor a 4 caracteres' })
  @Matches(/^(?!\s)[a-zA-Z\u00C0-\u017F\--\d\s]+[^\s]$/, {
    message: 'El campo material admite sólo letras, número y letras acentuadas',
  })
  readonly material: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo acabado no debe ser vacío' })
  @IsString({ message: 'El campo acabado debe ser de tipo cadena' })
  @MinLength(4, { message: 'El campo acabado es menor a 4 caracteres' })
  @Matches(/^(?!\s)[a-zA-Z\u00C0-\u017F\--\d\s]+[^\s]$/, {
    message: 'El campo acabado admite sólo letras, número y letras acentuadas',
  })
  readonly acabado: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo modalidad no debe ser vacío' })
  @IsString({ message: 'El campo modalidad debe ser de tipo cadena' })
  @MinLength(4, { message: 'El campo modalidad es menor a 4 caracteres' })
  @Matches(/^(?!\s)[a-zA-Z\u00C0-\u017F\--\d\s]+[^\s]$/, {
    message: 'El campo modalidad admite sólo letras, número y letras acentuadas',
  })
  readonly modalidad: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo Objeto de Contratacion no debe ser vacío' })
  @IsString({ message: 'El campo Objeto de Contratacion debe ser de tipo cadena' })
  @MinLength(4, { message: 'El campo Objeto de Contratacion es menor a 4 caracteres' })
  @Matches(/^(?!\s)[a-zA-Z\u00C0-\u017F\--\d\s]+[^\s]$/, {
    message: 'El campo Objeto de Contratacion admite sólo letras, número y letras acentuadas',
  })
  readonly metodo: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo forma no debe ser vacío' })
  @IsString({ message: 'El campo forma debe ser de tipo cadena' })
  @MinLength(4, { message: 'El campo forma es menor a 4 caracteres' })
  @Matches(/^(?!\s)[a-zA-Z\u00C0-\u017F\--\d\s]+[^\s]$/, {
    message: 'El campo forma admite sólo letras, número y letras acentuadas',
  })
  readonly forma: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo Objeto de Contratacion no debe ser vacío' })
  @IsNumber({}, { message: 'El campo Objeto de Contratacion debe ser de tipo numerico' })
  readonly precio: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo lugar_entrega no debe ser vacío' })
  @IsString({ message: 'El campo lugar_entrega debe ser de tipo cadena' })
  @MinLength(4, { message: 'El campo lugar_entrega es menor a 4 caracteres' })
  @Matches(/^(?!\s)[a-zA-Z\u00C0-\u017F\--\d\s]+[^\s]$/, {
    message: 'El campo lugar_entrega admite sólo letras, número y letras acentuadas',
  })
  readonly lugar_entrega: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo plazo no debe ser vacío' })
  @IsString({ message: 'El campo plazo debe ser de tipo cadena' })
  @MinLength(4, { message: 'El campo plazo es menor a 4 caracteres' })
  @Matches(/^(?!\s)[a-zA-Z\u00C0-\u017F\--\d\s]+[^\s]$/, {
    message: 'El campo plazo admite sólo letras, número y letras acentuadas',
  })
  readonly plazo: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo responsable_recepcion no debe ser vacío' })
  @IsString({ message: 'El campo responsable_recepcion debe ser de tipo cadena' })
  @MinLength(4, { message: 'El campo responsable_recepcion es menor a 4 caracteres' })
  @Matches(/^(?!\s)[a-zA-Z\u00C0-\u017F\--\d\s]+[^\s]$/, {
    message: 'El campo responsable_recepcion admite sólo letras, número y letras acentuadas',
  })
  readonly responsable_recepcion: string;
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo multas no debe ser vacío' })
  @IsString({ message: 'El campo multas debe ser de tipo cadena' })
  @MinLength(4, { message: 'El campo multas es menor a 4 caracteres' })
  @Matches(/^(?!\s)[a-zA-Z\u00C0-\u017F\--\d\s]+[^\s]$/, {
    message: 'El campo multas admite sólo letras, número y letras acentuadas',
  })
  readonly multas: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo forma_pago no debe ser vacío' })
  @IsString({ message: 'El campo forma_pago debe ser de tipo cadena' })
  @MinLength(4, { message: 'El campo forma_pago es menor a 4 caracteres' })
  @Matches(/^(?!\s)[a-zA-Z\u00C0-\u017F\--\d\s]+[^\s]$/, {
    message: 'El campo forma_pago admite sólo letras, número y letras acentuadas',
  })
  readonly forma_pago: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo transporte no debe ser vacío' })
  @IsString({ message: 'El campo transporte debe ser de tipo cadena' })
  @MinLength(4, { message: 'El campo transporte es menor a 4 caracteres' })
  @Matches(/^(?!\s)[a-zA-Z\u00C0-\u017F\--\d\s]+[^\s]$/, {
    message: 'El campo transporte admite sólo letras, número y letras acentuadas',
  })
  readonly transporte: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo forma_entrega no debe ser vacío' })
  @IsString({ message: 'El campo forma_entrega debe ser de tipo cadena' })
  @MinLength(4, { message: 'El campo forma_entrega es menor a 4 caracteres' })
  @Matches(/^(?!\s)[a-zA-Z\u00C0-\u017F\--\d\s]+[^\s]$/, {
    message: 'El campo forma_entrega admite sólo letras, número y letras acentuadas',
  })
  readonly forma_entrega: string;
}
