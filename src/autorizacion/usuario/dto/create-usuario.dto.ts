import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDefined, IsNotEmpty, IsNumberString, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUsuarioDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo Usuario no debe ser vacío' })
  @IsString({ message: 'El campo Usuario debe ser de tipo cadena' })
  @MaxLength(30, { message: 'El campo Usuario excede los 30 caracteres' })
  @MinLength(4, { message: 'El campo Usuario es menor a 4 caracteres' })
  readonly nombre: string;
  /*
  @ApiProperty()
  @IsNumberString({}, { message: 'El Identificador de Persona debe ser un numero en cadena' })
  @IsDefined({ message: 'El Identificador de Persona debe estar definido' })
  readonly idPersona: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo Persona debe estar definido' })
  @IsDefined({ message: 'El campo Persona debe estar definido' })
  @Type(() => PersonaDto)
  readonly persona: PersonaDto;*/
}
