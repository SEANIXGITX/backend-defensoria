export class ProgramaIncumplimiento {}
import { AuditoriaEntity } from 'src/shared/entities/auditoria.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('programas_meta', { schema: 'planificacion' })
export class ProgramaIncumplimientoEntity extends AuditoriaEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int8', name: 'operacion_meta_id', nullable: false })
  operacion_meta_id: number;

  @Column('varchar', { nullable: false })
  justificacion: string;

  @Column('varchar', { name: 'medidas_correctivas', nullable: false })
  medidasCorrectivas: string;

  @Column('varchar', { nullable: false })
  observacion: string;

  @Column('varchar', { name: 'fecha_justificacion', nullable: false })
  fechaJustificacion: string;

  @Column('varchar', { name: 'usuario_monitoreo_id', nullable: false })
  usuarioMonitoreoId: string;

  @Column('smallint', { name: 'estado_id', nullable: false })
  estadoId: number;
}
