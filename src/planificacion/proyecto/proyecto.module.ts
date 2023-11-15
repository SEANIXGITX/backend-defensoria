import { Module } from '@nestjs/common';
import { ProyectoService } from './proyecto.service';
import { ProyectoController } from './proyecto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProyectoEntity } from './entities/proyecto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProyectoEntity])],
  controllers: [ProyectoController],
  providers: [ProyectoService],
})
export class ProyectoModule {}
