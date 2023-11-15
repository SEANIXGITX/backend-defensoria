import { Exclude, Expose } from 'class-transformer';
import { RolDto } from './rol.dto';
@Exclude()
export class RolUsuarioDto {
  @Expose()
  id: number;
  @Expose()
  usuarioId: number;
  @Expose()
  idRol: number;
  @Expose()
  rol: RolDto;
}
