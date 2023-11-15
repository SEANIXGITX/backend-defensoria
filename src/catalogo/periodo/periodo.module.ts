import { Module } from '@nestjs/common';
import { PeriodoService } from './periodo.service';
import { PeriodoController } from './periodo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeriodoEntity } from './entities/periodo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PeriodoEntity])],
  controllers: [PeriodoController],
  providers: [PeriodoService],
})
export class PeriodoModule {}
