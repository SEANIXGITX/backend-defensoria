import { PresupuestoEntity } from 'src/ppto/presupuesto/entities/presupuesto.entity';
import { AuditoriaEntity } from 'src/shared/entities/auditoria.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('operaciones', { schema: 'planificacion' })
export class OperacionEntity extends AuditoriaEntity {
  @PrimaryGeneratedColumn('increment', { name: 'id_operacion' })
  idOperacion: number;

  @Column({ type: 'int2', name: 'reformulacion_id', nullable: false })
  reformulacionId: number;

  @Column({ type: 'int2', name: 'producto_id', nullable: false })
  productoId: number;

  @Column({ type: 'int4', name: 'unidad_id', nullable: false })
  unidadId: number;

  @Column({ type: 'int4', nullable: false })
  codigo: number;

  @Column('varchar', { length: 250, nullable: false })
  descripcion: string;

  @Column('smallint', { name: 'estado_id', nullable: false })
  estadoId: number;

  @Column({ type: 'int4', name: 'meta_global_planeada', nullable: false })
  metaGlobalPlaneada: number;

  @OneToMany(() => PresupuestoEntity, partidaOperacion => partidaOperacion.operacion)
  partidasOperacion: PresupuestoEntity[];
}
