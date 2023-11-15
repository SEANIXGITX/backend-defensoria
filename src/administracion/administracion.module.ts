import { CotizacionModule } from './cotizacion/cotizacion.module';
import { Module } from '@nestjs/common';
import { SolicitudModule } from './solicitud/solicitud.module';
import { PagoModule } from './pago/pago.module';
import { SolicitudDetalleModule } from './solicitud-detalle/solicitud-detalle.module';
import { EspecificacionTecnicaModule } from './especificacion-tecnica/especificacion-tecnica.module';
@Module({
  imports: [SolicitudModule, PagoModule, SolicitudDetalleModule, EspecificacionTecnicaModule, CotizacionModule],
})
export class AdministracionModule {}
