import { Exclude, Expose } from 'class-transformer';
@Exclude()
export class RolDto {
  @Expose()
  id: number;
  @Expose()
  nombre: string;
  @Expose()
  descripcion: string;
  @Expose()
  idTipoRol: number;
  @Expose()
  codigo: string;
  @Expose()
  tipo: string; //Clasificador;
  habilitado: boolean;
  usuarioCreacion: number;
  fechaCreacion: Date;
  hostCreacion: string;
  usuarioModificacion: number;
  fechaModificacion: Date;
  hostModificacion: string;
}
