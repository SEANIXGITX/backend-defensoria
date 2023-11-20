import { GestionEntity } from 'src/catalogo/gestion/entities/gestion.entity';
import { AuditoriaEntity } from 'src/shared/entities/auditoria.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity('programas', { schema: 'planificacion' })
export class ProgramaEntity extends AuditoriaEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int2', name: 'reformulacion_id', nullable: false })
  reformulacionId: number;

  @Column({ type: 'int2', name: 'gestion_id', nullable: false })
  gestionId: number;

  @Column({ type: 'int4', nullable: false })
  codigo: number;

  @Column('varchar', { nullable: false })
  descripcion: string;

  @Column({ type: 'int4', nullable: false })
  ponderacion: number;

  @Column({ type: 'int4', name: 'meta_global_planeada', nullable: false })
  metaGlobalPlaneada: number;

  @Column({ type: 'varchar', nullable: true })
  resultado: string;

  @Column('smallint', { name: 'indicador_id', nullable: true })
  indicadorId: number;

  @Column('smallint', { name: 'estado_id', nullable: false })
  estadoId: number;

  @OneToOne(() => GestionEntity, gestion => gestion.id)
  @JoinColumn([{ name: 'gestion_id', referencedColumnName: 'id' }])
  gestion: GestionEntity;
}
