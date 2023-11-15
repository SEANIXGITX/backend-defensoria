import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, MinLength } from 'class-validator';

export class CreateCotizacionDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo solicitudId no debe ser vacío' })
  @IsNumber({}, { message: 'El campo solicitudId debe estar definido y ser numérico.' })
  solicitudId: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo nombreOfertante no debe ser vacío' })
  @IsString({ message: 'El campo nombreOfertante debe ser de tipo cadena' })
  @MinLength(4, { message: 'El campo nombreOfertante es menor a 4 caracteres' })
  @Matches(/^(?!\s)[a-zA-Z\u00C0-\u017F\--\d\s]+[^\s]$/, {
    message: 'El campo nombreOfertante admite sólo letras, número y letras acentuadas',
  })
  readonly nombreOfertante: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  fecha: Date;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo monto no debe ser vacío' })
  @IsNumber({}, { message: 'El campo monto debe estar definido y ser numérico.' })
  monto: number;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'El campo imagen debe ser de tipo cadena' })
  @MinLength(4, { message: 'El campo imagen es menor a 4 caracteres' })
  @Matches(/^(?!\s)[a-zA-Z\u00C0-\u017F\--\d\s]+[^\s]$/, {
    message: 'El campo imagen admite sólo letras, número',
  })
  readonly imagen: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo estadoCotizacionId no debe ser vacío' })
  @IsNumber({}, { message: 'El campo estadoCotizacionId debe estar definido y ser numérico.' })
  estadoCotizacionId: number;
}
