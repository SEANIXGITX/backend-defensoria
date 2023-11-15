import { AuditoriaEntity } from 'src/shared/entities/auditoria.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { RolEntity } from '../../rol/entities/rol.entity';
import { MenuEntity } from './menu.entity';
@Unique(['perfilId', 'menuId'])
@Entity({ schema: 'autorizacion', name: 'perfiles_menu' })
export class RolMenuEntity extends AuditoriaEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'perfil_id', unique: true, nullable: false })
  perfilId: number;

  @Column({ name: 'menu_id', unique: true, nullable: false })
  menuId: number;

  @Column({ type: 'boolean', nullable: false })
  habilitado: boolean;

  @ManyToOne(() => RolEntity, roles => roles.menusRol)
  @JoinColumn({ name: 'perfil_id', referencedColumnName: 'id' })
  rol: RolEntity;

  @ManyToOne(() => MenuEntity, menus => menus.rolesMenu)
  @JoinColumn({ name: 'menu_id', referencedColumnName: 'id' })
  menu: MenuEntity;
}
