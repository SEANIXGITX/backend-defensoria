import { Module } from '@nestjs/common';
import { TipoSolicitudService } from './tipo-solicitud.service';
import { TipoSolicitudController } from './tipo-solicitud.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoSolicitudEntity } from './entities/tipo-solicitud.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TipoSolicitudEntity])],
  controllers: [TipoSolicitudController],
  providers: [TipoSolicitudService],
})
export class TipoSolicitudModule {}
