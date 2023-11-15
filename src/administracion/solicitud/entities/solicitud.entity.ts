import { SolicitudDetalleEntity } from 'src/administracion/solicitud-detalle/entities/solicitud-detalle.entity';
import { GestionEntity } from 'src/catalogo/gestion/entities/gestion.entity';
import { TipoSolicitudEntity } from 'src/catalogo/tipo-solicitud/entities/tipo-solicitud.entity';
import { AuditoriaEntity } from 'src/shared/entities/auditoria.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity('solicitudes', { schema: 'administracion' })
export class SolicitudEntity extends AuditoriaEntity {
  @PrimaryGeneratedColumn('increment', { name: 'id_solicitud' })
  idSolicitud: number;

  @Column({ type: 'int4', name: 'gestion_id', nullable: false })
  gestionId: number;

  @Column({ type: 'int4', name: 'proceso_id', nullable: false })
  procesoId: number;

  @Column({ type: 'int4', name: 'tipo_solicitud_id', nullable: false })
  tipoSolicitudId: number;

  @Column({ type: 'int4', name: 'tipo_contratacion_id', nullable: true })
  tipoContratacionId: number;

  @Column({ type: 'int4', name: 'tipo_adjudicacion_id', nullable: true })
  tipoAdjudicacionId: number;

  @Column({ type: 'int4', name: 'unidad_id', nullable: false })
  unidadId: number;

  @Column({ type: 'int8', name: 'nro_solicitud', nullable: false })
  nroSolicitud: number;

  @Column('timestamp', { name: 'fecha_registro', nullable: false })
  fechaRegistro: Date;

  @Column({ type: 'int8', name: 'usuario_id', nullable: false })
  usuarioId: number;

  @Column('varchar', { name: 'objeto_contratacion', length: 250, nullable: false })
  objetoContratacion: string;

  @Column('varchar', { name: 'justificacion', length: 250, nullable: false })
  justificacion: string;

  @Column('timestamp', { name: 'requerido_para', nullable: true })
  requeridoPara: Date;

  @Column('timestamp', { name: 'fecha_certificacion', nullable: true })
  fechaCertificacion: Date;

  @Column({ type: 'int8', name: 'nro_certificacion', nullable: true })
  nroCertificacion: number;

  @Column('varchar', { name: 'devolucion', length: 250, nullable: true })
  devolucion: string;

  @Column('varchar', { name: 'cuce', length: 250, nullable: true })
  cuce: string;

  @Column('smallint', { name: 'estado_id', nullable: false })
  estadoId: number;

  @OneToOne(() => SolicitudDetalleEntity, detalle => detalle.solicitud)
  detalle: SolicitudDetalleEntity;

  @OneToOne(() => TipoSolicitudEntity, ts => ts.id)
  @JoinColumn([{ name: 'tipo_solicitud_id', referencedColumnName: 'id' }])
  tipoSolicitud: TipoSolicitudEntity;

  @OneToOne(() => GestionEntity, gestiona => gestiona.id)
  @JoinColumn([{ name: 'gestion_id', referencedColumnName: 'id' }])
  gestion: GestionEntity;
}
