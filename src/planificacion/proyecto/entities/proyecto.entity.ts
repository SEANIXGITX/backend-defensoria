import { AuditoriaEntity } from 'src/shared/entities/auditoria.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('proyectos', { schema: 'planificacion' })
export class ProyectoEntity extends AuditoriaEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int2', name: 'reformulacion_id', nullable: false })
  reformulacionId: number;

  @Column({ type: 'int8', name: 'programa_id', nullable: false })
  programaId: number;

  @Column({ type: 'int4', nullable: false })
  codigo: number;

  @Column('varchar', { nullable: false })
  descripcion: string;

  @Column('varchar', { nullable: false })
  ponderacion: string;

  @Column({ type: 'int4', name: 'meta_global_planeada', nullable: false })
  metaGlobalPlaneada: number;

  @Column('smallint', { name: 'estado_id', nullable: false })
  estadoId: number;
}
