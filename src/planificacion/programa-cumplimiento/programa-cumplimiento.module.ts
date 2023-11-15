import { Module } from '@nestjs/common';
import { ProgramaCumplimientoService } from './programa-cumplimiento.service';
import { ProgramaCumplimientoController } from './programa-cumplimiento.controller';

@Module({
  controllers: [ProgramaCumplimientoController],
  providers: [ProgramaCumplimientoService],
})
export class ProgramaCumplimientoModule {}
