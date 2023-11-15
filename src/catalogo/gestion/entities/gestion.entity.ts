import { PeriodoEntity } from 'src/catalogo/periodo/entities/periodo.entity';
import { AuditoriaEntity } from 'src/shared/entities/auditoria.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, OneToOne } from 'typeorm';

@Entity('gestiones', { schema: 'catalogo' })
export class GestionEntity extends AuditoriaEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  descripcion: string;

  @Column('int', { name: 'tipo_id', default: null })
  tipoId: number;

  @Column('boolean', { select: false, default: false })
  programacion: boolean;

  @Column({ type: 'timestamp', name: 'programacion_inicial', select: false, default: null })
  programacionInicial: Date;

  @Column({ type: 'timestamp', name: 'programacion_fin', select: false, default: null })
  programacionFin: Date;

  @Column('int', { name: 'periodo_monitoreo_id', select: false, default: null })
  periodoMonitoreoId: number;

  @Column({ type: 'timestamp', name: 'monitoreo_inicial', select: false, default: null })
  monitoreoInicial: Date;

  @Column({ type: 'timestamp', name: 'monitoreo_fin', select: false, default: null })
  monitoreoFin: Date;

  @Column('int', { name: 'periodo_evaluacion_id', select: false, default: null })
  periodoEvaluacionId: number;

  @Column({ type: 'timestamp', name: 'evaluacion_inicial', select: false, default: null })
  evaluacionInicial: Date;

  @Column({ type: 'timestamp', name: 'evaluacion_fin', select: false, default: null })
  evaluacionFin: Date;

  @Column({ type: 'varchar', name: 'evaluacion_url', length: 255, select: false, default: null })
  evaluacionUrl: string;

  @Column('boolean', { select: false, default: false })
  reformulacion: boolean;

  @Column({ type: 'timestamp', name: 'reformulacion_inicial', select: false, default: null })
  reformulacionInicial: Date;

  @Column({ type: 'timestamp', name: 'reformulacion_fin', select: false, default: null })
  reformulacionFin: Date;

  @Column('smallint', { name: 'estado_id', nullable: false, default: null })
  estadoId: number;

  @OneToOne(() => PeriodoEntity, gestion => gestion.id)
  @JoinColumn([{ name: 'tipo_id', referencedColumnName: 'tipoId' }])
  tipoPeriodo: PeriodoEntity;
}
