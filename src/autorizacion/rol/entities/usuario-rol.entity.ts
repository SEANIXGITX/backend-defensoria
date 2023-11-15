import { UsuarioEntity } from 'src/autorizacion/usuario/entities/usuario.entity';
import { AuditoriaEntity } from 'src/shared/entities/auditoria.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RolEntity } from './rol.entity';

@Entity({ schema: 'autorizacion', name: 'usuarios_perfil' })
export class UsuarioRolEntity extends AuditoriaEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', name: 'tthh_usuario_id', nullable: false })
  tthhUsuarioId: string;

  @Column({ name: 'usuario_id', nullable: false })
  usuarioId: number;

  @Column({ name: 'perfil_id', nullable: false })
  perfilId: number;

  @Column({ type: 'boolean', nullable: false })
  habilitado: boolean;

  @ManyToOne(() => RolEntity, rol => rol.usuariosRol)
  @JoinColumn({ name: 'perfil_id', referencedColumnName: 'id' })
  rol: RolEntity;

  @ManyToOne(() => UsuarioEntity, usr => usr.rolesUsuario)
  @JoinColumn({ name: 'usuario_id', referencedColumnName: 'id' })
  usuario: UsuarioEntity;
}
