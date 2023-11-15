import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { boolean } from 'joi';

export class EstadoMenuDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'menuId' })
  menuId: number;

  @IsNotEmpty()
  @ApiProperty({ type: boolean, description: 'estado' })
  estado: boolean;
}
