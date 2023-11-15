import { Module } from '@nestjs/common';
import { EstadoCotizacionService } from './estado-cotizacion.service';
import { EstadoCotizacionController } from './estado-cotizacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadoCotizacionEntity } from './entities/estado-cotizacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EstadoCotizacionEntity])],
  controllers: [EstadoCotizacionController],
  providers: [EstadoCotizacionService],
})
export class EstadoCotizacionModule {}
