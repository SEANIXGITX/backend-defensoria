import { CotizacionModule } from './cotizacion/cotizacion.module';
import { Module } from '@nestjs/common';
import { SolicitudModule } from './solicitud/solicitud.module';
import { PagoModule } from './pago/pago.module';
import { SolicitudDetalleModule } from './solicitud-detalle/solicitud-detalle.module';
import { EspecificacionTecnicaModule } from './especificacion-tecnica/especificacion-tecnica.module';
import { SolicitudEspecificacionTecnicaModule } from './solicitud-especificacion-tecnica/solicitud-especificacion-tecnica.module';
import { SolicitudDetalleEspecificacionTecnicaModule } from './solicitud-detalle-especificacion-tecnica/solicitud-detalle-especificacion-tecnica.module';
@Module({
  imports: [SolicitudModule, PagoModule, SolicitudDetalleModule, EspecificacionTecnicaModule, CotizacionModule, SolicitudEspecificacionTecnicaModule, SolicitudDetalleEspecificacionTecnicaModule],
})
export class AdministracionModule {}
