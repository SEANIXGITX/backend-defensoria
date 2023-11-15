import { RolMenuEntity } from 'src/autorizacion/menu/entities/rol-menu.entity';
import { AuditoriaEntity } from 'src/shared/entities/auditoria.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { UsuarioRolEntity } from './usuario-rol.entity';

@Unique(['codigo'])
@Entity({ schema: 'autorizacion', name: 'perfiles' })
export class RolEntity extends AuditoriaEntity {
  @PrimaryGeneratedColumn() id?: number;

  @Column({ type: 'varchar', nullable: false })
  codigo: string;

  @Column({ type: 'varchar', nullable: true })
  descripcion: string;

  @Column({ type: 'integer', name: 'categoria_id', nullable: false })
  categoriaId: number;

  @Column({ type: 'boolean', nullable: false })
  habilitado: boolean;

  @OneToMany(() => UsuarioRolEntity, ur => ur.rol)
  usuariosRol: UsuarioRolEntity[];

  @OneToMany(() => RolMenuEntity, rm => rm.rol)
  menusRol: RolMenuEntity[];

  //@OneToMany(() => RolTipoActoProcesalEntity, rolTipoActoProcesal => rolTipoActoProcesal.rol)
  //tiposActosProcesales: RolTipoActoProcesalEntity[];

  static allFields() {
    return {
      id: true,
      nombre: true,
      codigo: true,
      descripcion: true,
      categoriaId: true,
      habilitado: true,
      usuarioCreacion: true,
      fechaCreacion: true,
      usuarioModificacion: true,
      fechaModificacion: true,
      menusRol: true,
    };
  }
}
