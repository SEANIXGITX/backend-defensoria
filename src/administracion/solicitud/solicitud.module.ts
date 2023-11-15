import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { SolicitudService } from './solicitud.service';
import { SolicitudController } from './solicitud.controller';
import { SolicitudEntity } from './entities/solicitud.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SolicitudEntity])],
  controllers: [SolicitudController],
  providers: [SolicitudService],
})
export class SolicitudModule {}
