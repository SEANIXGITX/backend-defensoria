import { AuditoriaEntity } from 'src/shared/entities/auditoria.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('formularios', { schema: 'catalogo' })
export class FormularioEntity extends AuditoriaEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { length: 250, nullable: false })
  clave: string;

  @Column('varchar', { nullable: false })
  descripcion: string;

  @Column('varchar', { name: 'valor_opcional', length: 255, nullable: true })
  valorOpcional: string;

  @Column({ type: 'int4', nullable: false })
  codigo: number;

  @Column('varchar', { name: 'nombre_formulario', length: 255, nullable: false })
  nombreFormulario: string;

  @Column({ type: 'int2', nullable: false })
  orden: number;

  @Column({ type: 'int4', name: 'padre_id', default: 0, nullable: false })
  padreId: number;

  @Column('smallint', { name: 'estado_id', default: 1, nullable: false })
  estadoId: number;
}
