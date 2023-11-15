import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsPositive, IsString, MaxLength } from 'class-validator';

export class CreateMenuDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'nombre dato requerido' })
  @IsString({ message: 'El campo Nombre debe ser de tipo cadena' })
  @MaxLength(60, { message: 'El campo Nombre excede los 60 caracteres' })
  nombre: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'descripcion dato requerido' })
  @IsString({ message: 'El campo descripcion debe ser de tipo cadena' })
  @MaxLength(50, { message: 'El campo descripcion excede los 50 caracteres' })
  descripcion: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'icono dato requerido' })
  @IsString({ message: 'El campo icono debe ser de tipo cadena' })
  @MaxLength(50, { message: 'El icono Nombre excede los 50 caracteres' })
  icono: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'url dato requerido' })
  @IsString({ message: 'El campo url debe ser de tipo cadena' })
  @MaxLength(50, { message: 'El campo url excede los 50 caracteres' })
  url: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'orden Despliegue dato requerido' })
  posicion: number;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsPositive({ message: 'El campo padre debe ser positivo ' })
  padreId: number;
}
