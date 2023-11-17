import { Module } from '@nestjs/common';
import { ProgramaMetaService } from './programa-meta.service';
import { ProgramaMetaController } from './programa-meta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramaMetaEntity } from './entities/programa-meta.entity';
import { ProgramaEntity } from '../programa/entities/programa.entity';
import { PeriodoEntity } from 'src/catalogo/periodo/entities/periodo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProgramaMetaEntity, ProgramaEntity, PeriodoEntity])],
  controllers: [ProgramaMetaController],
  providers: [ProgramaMetaService],
})
export class ProgramaMetaModule {}
