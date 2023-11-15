import { Module } from '@nestjs/common';
import { SolicitudDetalleService } from './solicitud-detalle.service';
import { SolicitudDetalleController } from './solicitud-detalle.controller';
import { SolicitudDetalleEntity } from './entities/solicitud-detalle.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SolicitudDetalleEntity])],
  controllers: [SolicitudDetalleController],
  providers: [SolicitudDetalleService],
})
export class SolicitudDetalleModule {}
