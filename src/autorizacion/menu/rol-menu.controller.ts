import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MessageResponse } from '../../shared/entities/message-response';
import { Public } from '../auth/decorators/auth-public.decorator';

import { GetUser } from '../auth/decorators/get-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateRolesMenuDto } from './dto/create-roles-menu.dto';
import { RolMenuEntity } from './entities/rol-menu.entity';
import { RolMenuService } from './rol-menu.service';

@ApiTags('Roles Menus')
@ApiBearerAuth()
@Controller('roles-menu')
//@UseGuards(JwtAuthGuard)
export class RolMenuController {
  constructor(private rolesMenusService: RolMenuService) {}

  @Get('roles/:perfilId')
  @Public()
  @ApiOperation({
    summary: 'Listar menus asignados a un rol',
    description: 'Servicio que permite listar los registros de los menus',
  })
  obtenerAsignacionMenus(@Param('perfilId', ParseIntPipe) perfilId: number) {
    return this.rolesMenusService.obtenerMenusPorRol(perfilId);
  }

  @Post()
  @ApiOperation({
    summary: 'Regristro de la relacion entre roles y menus',
    description: 'El servicio permite registrar la relacion entre roles y menus',
  })
  crearRolesMenus(@GetUser() usuario, @Body() rolMenu: CreateRolesMenuDto): Promise<MessageResponse<RolMenuEntity>> {
    return this.rolesMenusService.crearRolesMenus(rolMenu);
  }

  @Delete(':rolMenuId')
  @ApiOperation({
    summary: 'Permite eliminar la asignacion de menu a un rol',
    description: ' Servicio que permite cambiar de estado a no registrado de la relacion menus roles',
  })
  eliminarRolesMenus(@Param('rolMenuId', ParseIntPipe) id: number) {
    return this.rolesMenusService.eliminarRolesMenus(id);
  }
}
