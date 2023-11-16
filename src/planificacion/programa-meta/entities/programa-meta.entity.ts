import { AuditoriaEntity } from 'src/shared/entities/auditoria.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('programas_meta', { schema: 'planificacion' })
export class ProgramaMetaEntity extends AuditoriaEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int8', name: 'programa_id', nullable: false })
  programaId: number;

  @Column({ type: 'varchar', length: 255, name: 'codigo_periodo', nullable: false })
  codigoPeriodo: string;

  @Column({ type: 'int4', name: 'meta_planeada', nullable: false })
  metaPlaneada: number;

  @Column({ type: 'int4', name: 'meta_alcanzada', nullable: false })
  metaAlcanzada: number;

  @Column({ type: 'timestamp', name: 'fecha_meta_alcanzada', nullable: false })
  fechaMetaAlcanzada: Date;

  @Column('smallint', { name: 'estado_id', nullable: false })
  estadoId: number;
}
