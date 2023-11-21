import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, Max, IsString, Matches, MinLength, Min, ArrayMinSize, ValidateNested } from 'class-validator';
import { CreateProgramaResponsableDto } from 'src/planificacion/programa-responsable/dto/create-programa-responsable.dto';

export class CreateProgramaDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo reformulacionId no debe ser vacío' })
  @IsNumber({}, { message: 'El campo reformulacionId debe estar definido y ser numérico.' })
  reformulacionId: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo gestionId no debe ser vacío' })
  @IsNumber({}, { message: 'El campo gestionId debe estar definido y ser numérico.' })
  gestionId: number;

  @ApiProperty()
  @IsOptional({ message: 'El campo codigo no debe ser vacío' })
  @IsNumber({}, { message: 'El campo codigo debe estar definido y ser numérico.' })
  codigo: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo descripcion no debe ser vacío' })
  @IsString({ message: 'El campo descripcion debe ser de tipo cadena' })
  @MinLength(4, { message: 'El campo descripcion es menor a 4 caracteres' })
  @Matches(/^(?!\s)[a-zA-Z\u00C0-\u017F\--\d\s]+[^\s]$/, { message: 'El campo descripcion admite sólo letras, número y letras acentuadas' })
  readonly descripcion: string;

  @ApiProperty()
  @IsOptional({ message: 'El campo ponderacion no debe ser vacío' })
  @IsNumber({}, { message: 'El campo ponderacion debe estar definido y ser numérico.' })
  ponderacion: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo  meta Global Planeada no debe ser vacío' })
  @IsNumber({}, { message: 'El campo meta Global Planeada debe estar definido y ser numérico.' })
  @Min(1, { message: 'El campo  meta Global Planeada  debe ser mayor a 1' })
  @Max(100, { message: 'El campo  meta Global Planeada  debe ser igual o menor a 100' })
  metaGlobalPlaneada: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo indicadorId no debe ser vacío' })
  @IsNumber({}, { message: 'El campo indicadorId debe estar definido y ser numérico.' })
  indicadorId: number;

  @ApiProperty({ isArray: true, type: [CreateProgramaResponsableDto] })
  @Type(() => CreateProgramaResponsableDto)
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  readonly responsables: CreateProgramaResponsableDto[];
}
