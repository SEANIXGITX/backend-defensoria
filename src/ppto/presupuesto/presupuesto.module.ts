import { Module } from '@nestjs/common';
import { PresupuestoService } from './presupuesto.service';
import { PresupuestoController } from './presupuesto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PresupuestoEntity } from './entities/presupuesto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PresupuestoEntity])],
  controllers: [PresupuestoController],
  providers: [PresupuestoService],
})
export class PresupuestoModule {}
