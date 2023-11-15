import { Module } from '@nestjs/common';
import { OperacionMetaService } from './operacion-meta.service';
import { OperacionMetaController } from './operacion-meta.controller';

@Module({
  controllers: [OperacionMetaController],
  providers: [OperacionMetaService],
})
export class OperacionMetaModule {}
