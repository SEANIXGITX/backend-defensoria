import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsPositive } from 'class-validator';
export class CreateUsuarioRolDto {
  @ApiProperty({
    required: false,
    description: 'id de usuarioRol',
  })
  @IsPositive({ message: 'El Id debe ser positivo' })
  @IsOptional({ message: 'El id es requerido' })
  id?: number;

  @ApiProperty()
  @IsPositive({ message: 'El Id de Rol debe ser positivo' })
  @IsNotEmpty({ message: 'El id de Rol es requerido' })
  perfilId: number;
}
