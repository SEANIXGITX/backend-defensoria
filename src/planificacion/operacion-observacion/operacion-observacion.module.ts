import { Module } from '@nestjs/common';
import { OperacionObservacionService } from './operacion-observacion.service';
import { OperacionObservacionController } from './operacion-observacion.controller';

@Module({
  controllers: [OperacionObservacionController],
  providers: [OperacionObservacionService],
})
export class OperacionObservacionModule {}
