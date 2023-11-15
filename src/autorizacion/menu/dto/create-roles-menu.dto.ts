import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsInt, IsNotEmpty } from 'class-validator';

export class CreateRolesMenuDto {
  @ApiProperty()
  @IsInt({ message: 'El Identificador de Menu debe ser un entero' })
  @IsDefined({ message: 'El Identificador de Menu debe estar definido' })
  @IsNotEmpty({ message: 'identificador de Menu, dato requerido' })
  menuId: number;

  @ApiProperty()
  @IsInt({ message: 'El Identificador de Rol debe ser un entero' })
  @IsDefined({ message: 'El Identificador de Rol debe estar definido' })
  @IsNotEmpty({ message: 'identificador de Rol, dato requerido' })
  perfilId: number;
}
