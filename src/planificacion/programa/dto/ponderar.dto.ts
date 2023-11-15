import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, Matches, MinLength } from 'class-validator';

export class ListaProgramaDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo identificador de programa no debe ser vacío' })
  @IsNumber({}, { message: 'El campo identificador de programa debe estar definido y ser numérico.' })
  id: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo  ponderacion no debe ser vacío' })
  @IsNumber({}, { message: 'El campo ponderacion debe estar definido y ser numérico.' })
  ponderacion: number;
}
