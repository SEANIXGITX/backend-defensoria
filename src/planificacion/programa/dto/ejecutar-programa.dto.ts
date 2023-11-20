import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsNumberString, IsOptional, Max, IsString, Matches, MinLength, Min } from 'class-validator';

export class EjecutarProgramaDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo resultado no debe ser vacío' })
  @IsString({ message: 'El campo resultado debe ser de tipo cadena' })
  @MinLength(4, { message: 'El campo resultado es menor a 4 caracteres' })
  @Matches(/^(?!\s)[a-zA-Z\u00C0-\u017F\--\d\s]+[^\s]$/, { message: 'El campo resultado admite sólo letras, número y letras acentuadas' })
  readonly resultado: string;
}
