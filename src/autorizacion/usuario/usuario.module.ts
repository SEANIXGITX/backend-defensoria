import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolEntity } from '../rol/entities/rol.entity';
import { UsuarioRolEntity } from '../rol/entities/usuario-rol.entity';
import { UsuarioEntity } from './entities/usuario.entity';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { RolModule } from '../rol/rol.module';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioEntity, RolEntity, UsuarioRolEntity]), RolModule],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService],
})
export class UsuarioModule {}
