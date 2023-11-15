import { AuditoriaEntity } from 'src/shared/entities/auditoria.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('programas_meta', { schema: 'planificacion' })
export class ProgramaCumplimientoEntity extends AuditoriaEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int8', name: 'operacion_meta_id', nullable: false })
  operacion_meta_id: number;

  @Column({ type: 'int4', name: 'medio_verificacion_id', nullable: false })
  medioVerificacionId: number;

  @Column('varchar', { nullable: false })
  respaldo: string;

  @Column('varchar', { name: 'fecha_respaldo', nullable: false })
  fechaRespaldo: string;

  @Column('varchar', { name: 'usuario_monitoreo_id', nullable: false })
  usuarioMonitoreoId: string;

  @Column('smallint', { name: 'estado_id', nullable: false })
  estadoId: number;
}
