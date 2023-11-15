import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolEntity } from '../rol/entities/rol.entity';
import { UsuarioRolEntity } from '../rol/entities/usuario-rol.entity';
import { UsuarioEntity } from '../usuario/entities/usuario.entity';
import { MenuEntity } from './entities/menu.entity';
import { RolMenuEntity } from './entities/rol-menu.entity';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { RolMenuController } from './rol-menu.controller';
import { RolMenuService } from './rol-menu.service';

@Module({
  imports: [TypeOrmModule.forFeature([MenuEntity, RolMenuEntity, UsuarioEntity, UsuarioRolEntity, RolEntity])],
  controllers: [RolMenuController, MenuController],
  providers: [MenuService, RolMenuService],
  exports: [MenuService, RolMenuService],
})
export class MenuModule {}
