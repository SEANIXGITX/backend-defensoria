import { Module } from '@nestjs/common';
import { ProgramaIncumplimientoService } from './programa-incumplimiento.service';
import { ProgramaIncumplimientoController } from './programa-incumplimiento.controller';

@Module({
  controllers: [ProgramaIncumplimientoController],
  providers: [ProgramaIncumplimientoService],
})
export class ProgramaIncumplimientoModule {}
