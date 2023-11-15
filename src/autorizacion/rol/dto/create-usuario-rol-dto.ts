import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsInt, IsString, isString } from 'class-validator';
export class CreateUsuarioRolDto {
  @ApiProperty()
  @IsInt({ message: 'El campo identificador de usuario debe ser integer' })
  @IsDefined({ message: 'El campo identificador de usuario debe estar definido' })
  usuarioId: number;

  @ApiProperty()
  @IsInt({ message: 'El campo identificador de rol debe ser integer' })
  @IsDefined({ message: 'El campo identificador de rol debe estar definido' })
  perfilId: number;
}
