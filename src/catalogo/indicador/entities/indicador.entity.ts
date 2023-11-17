import { AuditoriaEntity } from 'src/shared/entities/auditoria.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('indicadores', { schema: 'catalogo' })
export class IndicadorEntity extends AuditoriaEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { nullable: false })
  descripcion: string;

  @Column('smallint', { name: 'estado_id', default: 1, nullable: false })
  estadoId: number;
}