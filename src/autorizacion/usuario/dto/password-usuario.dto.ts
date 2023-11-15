import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class PasswordUsuarioDto {
  @IsNotEmpty({ message: 'La Contraseña no debe ser vacía' })
  @IsString({ message: 'La Contraseña debe ser de tipo cadena' })
  @MaxLength(25, { message: 'La Contraseña excede los 25 caracteres' })
  @MinLength(4, { message: 'La Contraseña es menor a 4 caracteres' })
  @Matches(/((?=.*\d)|(?=.*\w+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'Contraseña demasiado debil' })
  readonly clave: string;
}
