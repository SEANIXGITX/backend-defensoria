import { AuditoriaEntity } from 'src/shared/entities/auditoria.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity('tipos_servicio', { schema: 'catalogo' })
export class TipoServicioEntity extends AuditoriaEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', nullable: false })
  descripcion: string;

  @Column('smallint', { name: 'estado_id', nullable: false })
  estadoId: number;
}
