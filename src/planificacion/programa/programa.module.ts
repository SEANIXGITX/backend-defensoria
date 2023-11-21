import { Module } from '@nestjs/common';
import { ProgramaService } from './programa.service';
import { ProgramaController } from './programa.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramaEntity } from './entities/programa.entity';
import { ProgramaResponsableModule } from '../programa-responsable/programa-responsable.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProgramaEntity]), ProgramaResponsableModule],
  controllers: [ProgramaController],
  providers: [ProgramaService],
})
export class ProgramaModule {}
