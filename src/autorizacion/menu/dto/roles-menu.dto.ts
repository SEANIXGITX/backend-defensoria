import { Exclude, Expose } from 'class-transformer';
import { MenuDto } from './menu.dto';
@Exclude()
export class RolesMenusDto {
  @Expose()
  id: number;
  @Expose()
  menuId: number;
  @Expose()
  perfilId: number;
  @Expose()
  menu: MenuDto;
}
