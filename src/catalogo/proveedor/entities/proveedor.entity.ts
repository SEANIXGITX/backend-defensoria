import { SolicitudEntity } from 'src/administracion/solicitud/entities/solicitud.entity';
import { TipoServicioEntity } from 'src/catalogo/tipo-servicio/entities/tipo-servicio.entity';
import { AuditoriaEntity } from 'src/shared/entities/auditoria.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity('proveedores', { schema: 'catalogo' })
export class ProveedorEntity extends AuditoriaEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int4', name: 'tipo_servicio_id', nullable: false })
  tipoServicioId: number;

  @Column('varchar', { nullable: false })
  descripcion: string;

  @Column('varchar', { length: 250, nullable: false })
  nit: string;

  @Column('varchar', { nullable: false })
  direccion: string;

  @Column('varchar', { name: 'correo_electronico', length: 250, nullable: false })
  correoElectronico: string;

  @Column('varchar', { name: 'representante_legal', length: 250, nullable: false })
  representanteLegal: string;

  @Column('varchar', { name: 'ci_representante_legal', length: 20, nullable: false })
  ciRepresentanteLegal: string;

  @Column('varchar', { name: 'nro_cuenta_banco', length: 200, nullable: false })
  nroCuentaBanco: string;

  @Column('smallint', { name: 'estado_id', nullable: false })
  estadoId: number;

  //@OneToMany(() => TipoServicioEntity, servicios => servicios.id)
  @OneToOne(() => TipoServicioEntity, servicios => servicios.id)
  @JoinColumn([{ name: 'tipo_servicio_id', referencedColumnName: 'id' }])
  tiposServicio: TipoServicioEntity;
}
