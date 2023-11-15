import { AuditoriaEntity } from 'src/shared/entities/auditoria.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('unidades_medida', { schema: 'catalogo' })
export class UnidadMedidaEntity extends AuditoriaEntity {
  @PrimaryGeneratedColumn('increment', { name: 'id_unidad_medida' })
  idUnidadMedida: number;

  @Column({ type: 'varchar', length: 250, nullable: false })
  descripcion: string;

  @Column('smallint', { name: 'estado_id', nullable: false })
  estadoId: number;
}
