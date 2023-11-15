import { BaseEntity, BeforeInsert, BeforeUpdate, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { GlobalService } from '../../autorizacion/auth/global.service';
export abstract class AuditoriaEntity extends BaseEntity {
  @Column('varchar', { name: 'usuario_creacion', length: 20, default: () => 'SESSION_USER', select: false })
  usuarioCreacion: string;

  @CreateDateColumn({ type: 'timestamp', name: 'fecha_creacion', default: () => 'now()', select: false })
  fechaCreacion: Date;

  @Column('varchar', { name: 'usuario_modificacion', length: 20, default: () => 'SESSION_USER', select: false })
  usuarioModificacion: string;

  @UpdateDateColumn({ type: 'timestamp', name: 'fecha_modificacion', default: () => 'now()', onUpdate: 'now()', select: false })
  fechaModificacion: Date;

  @Column('boolean', { default: true, select: false })
  activo: boolean;

  @BeforeInsert()
  setUsuarioCreacion() {
    if (GlobalService.userNameSession) {
      this.usuarioCreacion = GlobalService.userNameSession;
      this.usuarioModificacion = GlobalService.userNameSession;
    }
  }

  @BeforeUpdate()
  setUsuarioModificacion() {
    if (GlobalService.userNameSession) {
      this.usuarioModificacion = GlobalService.userNameSession;
    }
  }
}
