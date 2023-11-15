import { SolicitudEntity } from 'src/administracion/solicitud/entities/solicitud.entity';
import { ProveedorEntity } from 'src/catalogo/proveedor/entities/proveedor.entity';
import { UnidadMedidaEntity } from 'src/catalogo/unidad-medida/entities/unidad-medida.entity';
import { PresupuestoEntity } from 'src/ppto/presupuesto/entities/presupuesto.entity';
import { AuditoriaEntity } from 'src/shared/entities/auditoria.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity('solicitudes_detalle', { schema: 'administracion' })
export class SolicitudDetalleEntity extends AuditoriaEntity {
  @PrimaryGeneratedColumn('increment', { name: 'id_solicitud_detalle' })
  idSolicitudDetalle: number;

  @Column({ type: 'int8', name: 'solicitud_id', nullable: false })
  solicitudId: number;

  @Column({ type: 'int8', name: 'presupuesto_id', nullable: true })
  presupuestoId: number;

  @Column('varchar', { length: 250, nullable: false })
  descripcion: string;

  @Column({ type: 'int4', name: 'unidad_medida_id', nullable: false })
  unidadMedidaId: number;

  @Column({ type: 'int4', nullable: false })
  cantidad: number;

  @Column({ type: 'int4', name: 'precio_unitario', nullable: true })
  precioUnitario: number;

  @Column({ type: 'int4', name: 'monto_solicitado', nullable: true })
  montoSolicitado: number;

  @Column({ type: 'int4', name: 'monto_certificado', nullable: true })
  montoCertificado: number;

  @Column({ type: 'int4', name: 'nro_preventivo', nullable: true })
  nroPreventivo: number;

  @Column({ type: 'int4', name: 'proveedor_id', nullable: true })
  proveedorId: number;

  @Column('timestamp', { name: 'fecha_notificacion', nullable: true })
  fechaNotificacion: Date;

  @Column('smallint', { name: 'estado_id', nullable: false })
  estadoId: number;

  @OneToOne(() => SolicitudEntity, solicitud => solicitud.detalle)
  @JoinColumn([{ name: 'solicitud_id', referencedColumnName: 'idSolicitud' }])
  solicitud: SolicitudEntity;

  @OneToOne(() => PresupuestoEntity, solicitud => solicitud.idPresupuesto)
  @JoinColumn([{ name: 'presupuesto_id', referencedColumnName: 'idPresupuesto' }])
  presupuesto: PresupuestoEntity;

  @OneToOne(() => UnidadMedidaEntity, um => um.idUnidadMedida)
  @JoinColumn([{ name: 'unidad_medida_id', referencedColumnName: 'idUnidadMedida' }])
  unidadMedida: UnidadMedidaEntity;

  @OneToOne(() => ProveedorEntity, pro => pro.id)
  @JoinColumn([{ name: 'proveedor_id', referencedColumnName: 'id' }])
  proveedor: ProveedorEntity;
}
