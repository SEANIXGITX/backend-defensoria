import { AuditoriaEntity } from 'src/shared/entities/auditoria.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { RolMenuEntity } from './rol-menu.entity';

@Entity({ schema: 'autorizacion', name: 'menus' })
@Unique(['nombre'])
export class MenuEntity extends AuditoriaEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 60, nullable: false })
  nombre: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  descripcion: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  icono: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  url: string;

  @Column({ name: 'posicion', nullable: false })
  posicion: number;

  @Column({ name: 'padre_id', nullable: false })
  padreId: number;

  @Column({ type: 'boolean', nullable: false }) // mostrar
  habilitado: boolean;

  @OneToMany(() => RolMenuEntity, rm => rm.menu)
  rolesMenu: RolMenuEntity[];

  static allFields() {
    return {
      id: true,
      icono: true,
      url: true,
      posicion: true,
      padreId: true,
      descripcion: true,
      nombre: true,
      habilitado: true,
      usuarioCreacion: true,
      fechaCreacion: true,
      usuarioModificacion: true,
      fechaModificacion: true,
    };
  }
}
