import { Module } from '@nestjs/common';
import { PartidaService } from './partida.service';
import { PartidaController } from './partida.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartidaEntity } from './entities/partida.entity';
import { PresupuestoEntity } from 'src/ppto/presupuesto/entities/presupuesto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PartidaEntity, PresupuestoEntity])],
  controllers: [PartidaController],
  providers: [PartidaService],
})
export class PartidaModule {}
