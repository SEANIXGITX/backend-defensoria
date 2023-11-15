import { Module } from '@nestjs/common';
import { ProgramaService } from './programa.service';
import { ProgramaController } from './programa.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramaEntity } from './entities/programa.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProgramaEntity])],
  controllers: [ProgramaController],
  providers: [ProgramaService],
})
export class ProgramaModule {}
