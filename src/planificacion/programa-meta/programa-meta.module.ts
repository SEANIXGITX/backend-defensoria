import { Module } from '@nestjs/common';
import { ProgramaMetaService } from './programa-meta.service';
import { ProgramaMetaController } from './programa-meta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramaEntity } from '../programa/entities/programa.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProgramaEntity])],
  controllers: [ProgramaMetaController],
  providers: [ProgramaMetaService],
})
export class ProgramaMetaModule {}
