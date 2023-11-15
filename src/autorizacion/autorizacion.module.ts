import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MenuModule } from './menu/menu.module';
import { RolModule } from './rol/rol.module';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [AuthModule, MenuModule, RolModule, UsuarioModule],
})
export class AutorizacionModule {}
