import { AuditoriaEntity } from 'src/shared/entities/auditoria.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity('solicitudes_detalle_especificacion', { schema: 'administracion' })
export class SolicitudDetalleEspecificacionTecnicaEntity extends AuditoriaEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { length: 250, nullable: true })
  clave: string;

  @Column('varchar', { nullable: true })
  valor: string;

  @Column({ type: 'int8', name: 'solicitud_id', nullable: false })
  solicitudId: number;

  @Column({ type: 'int8', name: 'solicitud_detalle_id', nullable: false })
  solicitudDetalleId: number;

  @Column('smallint', { name: 'estado_id', nullable: false })
  estadoId: number;
}
