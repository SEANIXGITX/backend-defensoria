import { Module } from '@nestjs/common';
import { EspecificacionTecnicaService } from './especificacion-tecnica.service';
import { EspecificacionTecnicaController } from './especificacion-tecnica.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EspecificacionTecnicaEntity } from './entities/especificacion-tecnica.entity';
import { FormularioModule } from 'src/catalogo/formulario/formulario.module';

@Module({
  imports: [TypeOrmModule.forFeature([EspecificacionTecnicaEntity]), FormularioModule],
  controllers: [EspecificacionTecnicaController],
  providers: [EspecificacionTecnicaService],
})
export class EspecificacionTecnicaModule {}
