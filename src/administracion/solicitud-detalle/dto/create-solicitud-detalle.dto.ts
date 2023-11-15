import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, Matches, MinLength } from 'class-validator';

export class CreateSolicitudDetalleDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo solicitudId no debe ser vacío' })
  @IsNumber({}, { message: 'El campo solicitudId debe estar definido y ser numérico.' })
  solicitudId: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo presupuestoId no debe ser vacío' })
  @IsNumber({}, { message: 'El campo presupuestoId debe estar definido y ser numérico.' })
  presupuestoId: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo descripcion no debe ser vacío' })
  @IsString({ message: 'El campo descripcion debe ser de tipo cadena' })
  @MinLength(4, { message: 'El campo descripcion es menor a 4 caracteres' })
  @Matches(/^(?!\s)[a-zA-Z\u00C0-\u017F\--\d\s]+[^\s]$/, { message: 'El campo descripcion admite sólo letras, número y letras acentuadas' })
  readonly descripcion: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo unidadMedidaId no debe ser vacío' })
  @IsNumber({}, { message: 'El campo unidadMedidaId debe estar definido y ser numérico.' })
  unidadMedidaId: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo cantidad no debe ser vacío' })
  @IsNumber({}, { message: 'El campo cantidad debe estar definido y ser numérico.' })
  cantidad: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber({}, { message: 'El campo precioUnitario debe estar definido y ser numérico.' })
  precioUnitario: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber({}, { message: 'El campo montoSolicitado debe estar definido y ser numérico.' })
  montoSolicitado: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber({}, { message: 'El campo montoCertificado debe estar definido y ser numérico.' })
  montoCertificado: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber({}, { message: 'El campo nroPreventivo debe estar definido y ser numérico.' })
  nroPreventivo: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber({}, { message: 'El campo proveedorId debe estar definido y ser numérico.' })
  proveedorId: number;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  fechaNotificacion: Date;
}
