import { AuditoriaEntity } from 'src/shared/entities/auditoria.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity('periodos', { schema: 'catalogo' })
export class PeriodoEntity extends AuditoriaEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  codigo: string;

  @Column({ type: 'varchar', nullable: false })
  descripcion: string;

  @Column('int', { name: 'tipo_id', default: false })
  tipoId: number;

  @Column({ type: 'varchar', name: 'codigo_tipo', length: 255, nullable: false })
  codigoTipo: string;

  @Column('smallint', { name: 'estado_id', nullable: false, default: 1 })
  estadoId: number;
}
