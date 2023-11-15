import { Module } from '@nestjs/common';
import { PartidaModule } from './partida/partida.module';
import { PresupuestoModule } from './presupuesto/presupuesto.module';

@Module({ imports: [PartidaModule, PresupuestoModule] })
export class PptoModule {}
