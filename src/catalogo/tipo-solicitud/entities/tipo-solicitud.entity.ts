import { SolicitudEntity } from 'src/administracion/solicitud/entities/solicitud.entity';
import { AuditoriaEntity } from 'src/shared/entities/auditoria.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity('tipos_solicitud', { schema: 'catalogo' })
export class TipoSolicitudEntity extends AuditoriaEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', nullable: false })
  descripcion: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  sigla: string;

  @Column('smallint', { name: 'estado_id', nullable: false })
  estadoId: number;

  @OneToMany(() => SolicitudEntity, solicitud => solicitud.tipoSolicitud)
  solicitudes: SolicitudEntity[];
}
