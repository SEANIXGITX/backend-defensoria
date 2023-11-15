import { Module } from '@nestjs/common';
import { CotizacionService } from './cotizacion.service';
import { CotizacionController } from './cotizacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CotizacionEntity } from './entities/cotizacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CotizacionEntity])],
  controllers: [CotizacionController],
  providers: [CotizacionService],
})
export class CotizacionModule {}
