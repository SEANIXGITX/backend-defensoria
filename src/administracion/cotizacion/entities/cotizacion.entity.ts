export class Cotizacion {}
import { EstadoCotizacionEntity } from 'src/catalogo/estado-cotizacion/entities/estado-cotizacion.entity';
import { AuditoriaEntity } from 'src/shared/entities/auditoria.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity('cotizaciones', { schema: 'administracion' })
export class CotizacionEntity extends AuditoriaEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int8', name: 'solicitud_id', nullable: false })
  solicitudId: number;

  @Column('varchar', { name: 'nombre_ofertante', nullable: false })
  nombreOfertante: string;

  @Column('timestamp', { nullable: true })
  fecha: Date;

  @Column({ type: 'int8', nullable: false })
  monto: number;

  @Column('varchar', { nullable: true })
  imagen: string;

  @Column('smallint', { name: 'estado_cotizacion_id', nullable: false })
  estadoCotizacionId: number;

  @Column('smallint', { name: 'estado_id', nullable: false })
  estadoId: number;

  @OneToOne(() => EstadoCotizacionEntity, estado => estado.cotizaciones)
  @JoinColumn({ name: 'estado_cotizacion_id', referencedColumnName: 'id' })
  estadoCoti: EstadoCotizacionEntity;
}
