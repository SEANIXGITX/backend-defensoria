import { Module } from '@nestjs/common';
import { FormularioService } from './formulario.service';
import { FormularioController } from './formulario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormularioEntity } from './entities/formulario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FormularioEntity])],

  controllers: [FormularioController],
  providers: [FormularioService],
  exports: [FormularioService],
})
export class FormularioModule {}
