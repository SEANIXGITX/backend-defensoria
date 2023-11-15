import { Module } from '@nestjs/common';
import { TipoServicioService } from './tipo-servicio.service';
import { TipoServicioController } from './tipo-servicio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoServicioEntity } from './entities/tipo-servicio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TipoServicioEntity])],
  controllers: [TipoServicioController],
  providers: [TipoServicioService],
})
export class TipoServicioModule {}
