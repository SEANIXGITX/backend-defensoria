import { Module } from '@nestjs/common';
import { UnidadMedidaModule } from './unidad-medida/unidad-medida.module';
import { FormularioModule } from './formulario/formulario.module';
import { TipoSolicitudModule } from './tipo-solicitud/tipo-solicitud.module';
import { GestionModule } from './gestion/gestion.module';
import { EstadoCotizacionModule } from './estado-cotizacion/estado-cotizacion.module';
import { ProveedorModule } from './proveedor/proveedor.module';
import { TipoServicioModule } from './tipo-servicio/tipo-servicio.module';
import { PeriodoModule } from './periodo/periodo.module';

@Module({ imports: [UnidadMedidaModule, FormularioModule, TipoSolicitudModule, GestionModule, EstadoCotizacionModule, ProveedorModule, TipoServicioModule, PeriodoModule] })
export class CatalogoModule {}
