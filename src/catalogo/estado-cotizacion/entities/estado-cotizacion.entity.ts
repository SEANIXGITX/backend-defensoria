import { CotizacionEntity } from 'src/administracion/cotizacion/entities/cotizacion.entity';
import { AuditoriaEntity } from 'src/shared/entities/auditoria.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity('estados_cotizacion', { schema: 'catalogo' })
export class EstadoCotizacionEntity extends AuditoriaEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', nullable: false })
  descripcion: string;

  @Column('smallint', { name: 'estado_id', nullable: false })
  estadoId: number;

  @OneToMany(() => CotizacionEntity, cotizacion => cotizacion.id)
  cotizaciones: CotizacionEntity[];
}
