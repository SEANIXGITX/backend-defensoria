import { OperacionEntity } from 'src/planificacion/operacion/entities/operacion.entity';
import { PartidaEntity } from 'src/ppto/partida/entities/partida.entity';
import { AuditoriaEntity } from 'src/shared/entities/auditoria.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('presupuestos', { schema: 'presupuesto' })
export class PresupuestoEntity extends AuditoriaEntity {
  @PrimaryGeneratedColumn('increment', { name: 'id_presupuesto' })
  idPresupuesto: number;

  @Column({ type: 'int4', name: 'operacion_id', nullable: false })
  operacionId: number;

  @Column({ type: 'int4', name: 'partida_id', nullable: false })
  partidaId: number;

  @Column({ type: 'int4', name: 'gestion_id', nullable: false })
  gestionId: number;

  @Column({ type: 'int4', name: 'organismo_financiador_id', nullable: false })
  organismo_financiador_id: number;

  @Column({ type: 'int8', name: 'monto_aprobado', nullable: true })
  monto_aprobado: number;

  @Column('smallint', { name: 'estado_id', nullable: false })
  estadoId: number;

  @ManyToOne(() => PartidaEntity, partida => partida.presupuestos)
  @JoinColumn({ name: 'partida_id', referencedColumnName: 'idPartida' })
  partida: PartidaEntity;

  @ManyToOne(() => OperacionEntity, operacion => operacion.partidasOperacion)
  @JoinColumn({ name: 'operacion_id', referencedColumnName: 'idOperacion' })
  operacion: OperacionEntity;
}
