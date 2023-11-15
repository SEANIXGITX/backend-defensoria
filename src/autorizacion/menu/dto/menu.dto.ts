import { Exclude, Expose } from 'class-transformer';
@Exclude()
export class MenuDto {
  @Expose()
  id: number;
  @Expose()
  menu: string;
  @Expose()
  descripcion: string;
  @Expose()
  icono: string;
  @Expose()
  url: string;
  @Expose()
  posicion: number;
  @Expose()
  sistemaId: number;
  @Expose()
  estado: boolean;
}
