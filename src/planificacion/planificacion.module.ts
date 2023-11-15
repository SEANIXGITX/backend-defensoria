import { Module } from '@nestjs/common';
import { OperacionModule } from './operacion/operacion.module';
import { OperacionMetaModule } from './operacion-meta/operacion-meta.module';
import { OperacionObservacionModule } from './operacion-observacion/operacion-observacion.module';
import { ProductoModule } from './producto/producto.module';
import { ProyectoModule } from './proyecto/proyecto.module';
import { ProgramaModule } from './programa/programa.module';
import { ProgramaMetaModule } from './programa-meta/programa-meta.module';
import { ProgramaCumplimientoModule } from './programa-cumplimiento/programa-cumplimiento.module';
import { ProgramaIncumplimientoModule } from './programa-incumplimiento/programa-incumplimiento.module';
@Module({
  imports: [OperacionModule, OperacionMetaModule, OperacionObservacionModule, ProductoModule, ProyectoModule, ProgramaModule, ProgramaMetaModule, ProgramaCumplimientoModule, ProgramaIncumplimientoModule],
})
export class PlanificacionModule {}
