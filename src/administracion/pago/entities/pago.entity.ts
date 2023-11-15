import { AuditoriaEntity } from 'src/shared/entities/auditoria.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('pagos', { schema: 'administracion' })
export class PagoEntity extends AuditoriaEntity {
  @PrimaryGeneratedColumn('increment', { name: 'id_pago' })
  idPago: number;

  @Column({ type: 'int8', name: 'solicitud_id', nullable: false })
  solicitudId: number;

  @Column({ type: 'int8', name: 'informes_conformidad_id', nullable: false })
  informesConformidadId: number;

  @Column({ type: 'int8', name: 'usuario_id', nullable: false })
  usuarioId: number;

  @Column('varchar', { name: 'concepto', length: 250, nullable: false })
  concepto: string;

  @Column({ type: 'int8', name: 'nro', nullable: false })
  nro: number;

  @Column('timestamp', { name: 'fecha', nullable: true })
  fecha: Date;

  @Column({ type: 'int8', name: 'tipo_documento_id', nullable: false })
  tipoDocumentoId: number;

  @Column('varchar', { name: 'factura', length: 250, nullable: false })
  factura: string;

  @Column({ type: 'int8', name: 'retencion_id', nullable: false })
  retencionId: number;

  @Column('varchar', { name: 'hoja_ruta', length: 250, nullable: false })
  hojaRuta: string;

  @Column('smallint', { name: 'estado_id' })
  estadoId: number;
}
