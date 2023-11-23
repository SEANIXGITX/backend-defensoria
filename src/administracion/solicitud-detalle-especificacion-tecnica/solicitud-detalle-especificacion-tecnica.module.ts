import { Module } from '@nestjs/common';
import { SolicitudDetalleEspecificacionTecnicaService } from './solicitud-detalle-especificacion-tecnica.service';
import { SolicitudDetalleEspecificacionTecnicaController } from './solicitud-detalle-especificacion-tecnica.controller';

@Module({
  controllers: [SolicitudDetalleEspecificacionTecnicaController],
  providers: [SolicitudDetalleEspecificacionTecnicaService],
})
export class SolicitudDetalleEspecificacionTecnicaModule {}
