import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class AuthLoginDto {
  @IsNotEmpty({ message: 'El campo Usuario no debe ser vacío' })
  @IsString({ message: 'El campo Usuario debe ser de tipo cadena' })
  @MaxLength(20, { message: 'El campo Usuario excede los 20 caracteres' })
  @MinLength(4, { message: 'El campo Usuario es menor a 4 caracteres' })
  usuario: string;

  @IsNotEmpty({ message: 'El campo Clave/Contraseña no debe ser vacío' })
  @IsString({ message: 'El campo Clave/Contraseña debe ser de tipo cadena' })
  // @Matches(/((?=.*\d)|(?=.*\w+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'Contraseña demasiado debil' })
  clave: string;
}
