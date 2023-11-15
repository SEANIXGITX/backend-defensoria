import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsPositive } from 'class-validator';

export class RolMenuDto {
  @ApiProperty({
    required: false,
    description: 'id de menuRol',
  })
  @IsPositive({ message: 'El Id debe ser positivo' })
  @IsOptional({ message: 'El id es requerido' })
  id?: number;

  @ApiProperty()
  @IsPositive({ message: 'El Id de Menu debe ser positivo' })
  @IsNotEmpty({ message: 'El id de Menu es requerido' })
  menuId: number;
}
