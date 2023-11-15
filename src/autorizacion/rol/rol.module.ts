import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuEntity } from '../menu/entities/menu.entity';
import { RolMenuEntity } from '../menu/entities/rol-menu.entity';
import { UsuarioEntity } from '../usuario/entities/usuario.entity';
import { RolEntity } from './entities/rol.entity';
import { UsuarioRolEntity } from './entities/usuario-rol.entity';
import { RolController } from './rol.controller';
import { RolService } from './rol.service';
import { UsuarioRolController } from './usuario-rol.controller';
import { UsuarioRolService } from './usuario-rol.service';

@Module({
  imports: [TypeOrmModule.forFeature([RolEntity, RolMenuEntity, MenuEntity, UsuarioRolEntity, UsuarioEntity])],
  controllers: [RolController, UsuarioRolController],
  providers: [RolService, UsuarioRolService],
  exports: [RolService, UsuarioRolService],
})
export class RolModule {}
