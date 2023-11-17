import { Module } from '@nestjs/common';
import { IndicadorService } from './indicador.service';
import { IndicadorController } from './indicador.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IndicadorEntity } from './entities/indicador.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IndicadorEntity])],
  controllers: [IndicadorController],
  providers: [IndicadorService],
})
export class IndicadorModule {}
