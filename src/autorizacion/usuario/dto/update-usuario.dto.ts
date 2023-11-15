import { PartialType } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { CreateUsuarioDto } from './create-usuario.dto';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
  @IsNotEmpty({ message: 'La Contraseña no debe ser vacía' })
  @IsString({ message: 'La Contraseña debe ser de tipo cadena' })
  @MaxLength(25, { message: 'La Contraseña excede los 25 caracteres' })
  @MinLength(4, { message: 'La Contraseña es menor a 4 caracteres' })
  @Matches(/((?=.*\d)|(?=.*\w+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'Contraseña demasiado debil' })
  @IsOptional()
  readonly clave?: string;
  /*
  @IsNotEmpty({ message: 'El Token de Actualización no debe ser vacío' })
  @IsString({ message: 'El Token de Actualización debe ser de tipo cadena' })
  @MaxLength(250, { message: 'El Token de Actualización excede los 250 caracteres' })
  @MinLength(20, { message: 'El Token de Actualización es menor a 20 caracteres' })
  @IsOptional()
  readonly refreshToken?: string;  */

  @IsBoolean({ message: 'El campo Habilitado debe ser de tipo verdadero o falso' })
  @IsOptional()
  readonly habilitado?: boolean;
}
