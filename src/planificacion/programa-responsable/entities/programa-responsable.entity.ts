import { UsuarioEntity } from 'src/autorizacion/usuario/entities/usuario.entity';
import { GestionEntity } from 'src/catalogo/gestion/entities/gestion.entity';
import { AuditoriaEntity } from 'src/shared/entities/auditoria.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity('programas_responsable', { schema: 'planificacion' })
export class ProgramaResponsableEntity extends AuditoriaEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int8', name: 'programa_id', nullable: false })
  programaId: number;

  @Column({ type: 'int2', name: 'gestion_id', nullable: true })
  gestionId: number;

  @Column({ type: 'int8', name: 'usuario_id', nullable: false })
  usuarioId: number;

  @Column('smallint', { name: 'estado_id', nullable: false })
  estadoId: number;

  @OneToOne(() => GestionEntity, gestion => gestion.id)
  @JoinColumn([{ name: 'gestion_id', referencedColumnName: 'id' }])
  gestion: GestionEntity;

  @OneToOne(() => UsuarioEntity, usr => usr.id)
  @JoinColumn([{ name: 'usuario_id', referencedColumnName: 'id' }])
  usuario: UsuarioEntity;
}
