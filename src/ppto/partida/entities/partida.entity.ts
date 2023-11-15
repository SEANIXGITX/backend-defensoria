import { PresupuestoEntity } from 'src/ppto/presupuesto/entities/presupuesto.entity';
import { AuditoriaEntity } from 'src/shared/entities/auditoria.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('partidas', { schema: 'presupuesto' })
export class PartidaEntity extends AuditoriaEntity {
  @PrimaryGeneratedColumn('increment', { name: 'id_partida' })
  idPartida: number;

  @Column({ type: 'int4', nullable: false })
  codigo: number;

  @Column('varchar', { length: 250, nullable: false })
  descripcion: string;

  @Column('smallint', { name: 'estado_id', nullable: false })
  estadoId: number;

  @OneToMany(() => PresupuestoEntity, partidaOperacion => partidaOperacion.partida)
  presupuestos: PresupuestoEntity[];
}
