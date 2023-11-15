import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CrearRolDto {
  @ApiProperty({ example: 'SECRE-SALA' })
  @IsNotEmpty({ message: 'El campo codigo no debe ser vacío' })
  @IsString({ message: 'El campo codigo debe ser de tipo cadena' })
  @MaxLength(20, { message: 'El campo codigo excede los 20 caracteres' })
  @MinLength(4, { message: 'El campo codigo es menor a 4 caracteres' })
  readonly codigo: string;

  @ApiProperty({ example: 'Secretaria de Sala' })
  @IsNotEmpty({ message: 'El campo descripcion  no debe ser vacío' })
  @IsString({ message: 'El campo descripcion  debe ser de tipo cadena' })
  @MaxLength(200, { message: 'El campo descripcion excede los 200 caracteres' })
  @MinLength(4, { message: 'El campo descripcion  es menor a 4 caracteres' })
  readonly descripcion: string;

  //@IsInt({ message: 'El Identificador de TIPO de rol debe ser un entero' })
  //@IsDefined({ message: 'El Identificador de tipo de rol debe estar definido' })
  //readonly idTipoRol: number;
}
