import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsPositive } from 'class-validator';

export class CreateRolPermisoDto {
  @ApiProperty({
    required: false,
    description: 'id de permisoRol',
  })
  @IsPositive({ message: 'El Id debe ser positivo' })
  @IsOptional({ message: 'El id es requerido' })
  id?: number;

  @ApiProperty()
  @IsPositive({ message: 'El Id de Permiso debe ser positivo' })
  @IsNotEmpty({ message: 'El id de Permiso es requerido' })
  idPermiso: number;
}
