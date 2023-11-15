import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiMessageResponse } from '../../shared/decorators/api-message-response.decorator';
import { MessageResponse } from '../../shared/entities/message-response';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { RoleGuard } from '../auth/guards/roles.guard';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { MenuEntity } from './entities/menu.entity';
import { MenuService } from './menu.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
@Controller()
@ApiTags('Menus')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @UseGuards(RoleGuard)
  @Get('menus')
  @ApiOperation({ summary: 'Listar registros de menus', description: ' Servicio para listar los registros de los menus' })
  obtenerMenus() {
    return this.menuService.obtenerMenus();
  }

  //@UseGuards(RoleGuard)
  @Post('menus')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Crea un registro de menu', description: ' Servicio de creacion de registros de menus' })
  @ApiMessageResponse({ status: HttpStatus.OK, model: MenuEntity, isArray: false })
  crearMenu(@Body() createMenuDto: CreateMenuDto): Promise<MessageResponse<MenuEntity>> {
    return this.menuService.crearMenu(createMenuDto);
  }

  @Patch('menus/:id')
  @ApiOperation({
    summary: 'Modificacion de registro de menus',
    description: 'Servicio de edicion de registro de menus, requiere el Id',
  })
  actualizar(@Param('id', ParseIntPipe) id: number, @Body() createMenuDto: UpdateMenuDto) {
    return this.menuService.actualizarMenu(id, createMenuDto);
  }

  @Delete('menus/:id')
  @ApiOperation({ summary: 'Eliminar registros de menu', description: 'Servicio que permite eliminar un registro de menu, requiere el Id' })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.menuService.eliminarMenu(id);
  }

  @Get('menus/porUsuario')
  @ApiOperation({
    summary: 'Listado de registros de menus plano segun el identificador de usuario',
  })
  listarPorIdUsuario(@Query('idUsuario', ParseIntPipe) idUsuario: number) {
    return this.menuService.listarPorIdUsuario(idUsuario);
  }

  @Get('menus/jerarquico/porUsuario')
  @ApiOperation({
    summary: 'Listado de los registros de menus con subMenu segun el identificador de usuario',
  })
  listadoJerarquico(@Query('idUsuario', ParseIntPipe) idUsuario: number): Promise<MessageResponse<any>> {
    return this.menuService.menuJerarquicoPorUsuario(idUsuario);
  }

  @Patch('menus/:id/cambiar-disponibilidad')
  @UseGuards(RoleGuard)
  @ApiOperation({
    summary: 'Habilita o inhabilita el menu',
  })
  cambiarDisponibilidad(@GetUser() @Param('id', ParseIntPipe) id: number) {
    return this.menuService.enable(id);
  }
}
