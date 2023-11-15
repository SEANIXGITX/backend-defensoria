import { AuditoriaEntity } from 'src/shared/entities/auditoria.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('productos', { schema: 'planificacion' })
export class ProductoEntity extends AuditoriaEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int2', name: 'reformulacion_id', nullable: false })
  reformulacionId: number;

  @Column({ type: 'int8', name: 'proyecto_id', nullable: false })
  proyectoId: number;

  @Column({ type: 'int4', nullable: false })
  codigo: number;

  @Column('varchar', { nullable: false })
  descripcion: string;

  @Column('varchar', { name: 'indicador_proceso', nullable: false })
  indicadorProceso: string;

  @Column('varchar', { nullable: false })
  formula: string;

  @Column('varchar', { name: 'linea_base', nullable: true })
  lineaBase: string;

  @Column({ type: 'int4', name: 'meta_global_planeada', nullable: false })
  metaGlobalPlaneada: number;

  @Column('smallint', { name: 'estado_id', nullable: false })
  estadoId: number;
}
