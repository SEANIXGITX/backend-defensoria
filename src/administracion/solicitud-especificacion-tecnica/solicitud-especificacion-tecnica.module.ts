import { Module } from '@nestjs/common';
import { SolicitudEspecificacionTecnicaService } from './solicitud-especificacion-tecnica.service';
import { SolicitudEspecificacionTecnicaController } from './solicitud-especificacion-tecnica.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SolicitudEspecificacionTecnicaEntity } from './entities/solicitud-especificacion-tecnica.entity';
import { SolicitudDetalleEspecificacionTecnicaEntity } from '../solicitud-detalle-especificacion-tecnica/entities/solicitud-detalle-especificacion-tecnica.entity';
import { FormularioModule } from 'src/catalogo/formulario/formulario.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SolicitudEspecificacionTecnicaEntity, SolicitudDetalleEspecificacionTecnicaEntity]),
    FormularioModule,
  ],
  controllers: [SolicitudEspecificacionTecnicaController],
  providers: [SolicitudEspecificacionTecnicaService],
})
export class SolicitudEspecificacionTecnicaModule {}
