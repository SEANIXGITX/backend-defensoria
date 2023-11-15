import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../auth/guards/roles.guard';
import { CrearRolDto } from './dto/create-rol-dto';
import { CreateRolPermisoDto } from './dto/create-rol-permiso.dto';
import { RolMenuDto } from './dto/rol-menu.dto';
import { RolService } from './rol.service';

@ApiTags('Roles')
@ApiBearerAuth()
//@UseGuards(JwtAuthGuard)
@Controller('roles')
export class RolController {
  constructor(private rolService: RolService) {}

  @Get()
  @ApiOperation({ summary: 'Lista de roles', description: ' Retorna una lista de roles con los ids de menus, usuario' })
  async obtenerRoles() {
    return this.rolService.obtenerRoles();
  }

  @Post()
  //@UseGuards(RoleGuard)
  @ApiOperation({ summary: 'Registro de roles', description: ' Servicio que permite crear registros de roles' })
  async crearRol(@Body() createRolDto: CrearRolDto) {
    return this.rolService.createRol(createRolDto); // usuario.usuarioId
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Modificacion de resgistros de roles',
    description: 'Servicio que permite modificar los regitros de roles, requiere el ID del registro',
  })
  updateRol(@Body() updateRolDto: CrearRolDto, @Param('id', ParseIntPipe) id: number) {
    return this.rolService.updateRol(id, updateRolDto); //, usuario.usuarioId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar registros de rol' })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.rolService.eliminar(id);
  }

  @Patch(':id/cambiar-disponibilidad')
  @UseGuards(RoleGuard)
  @ApiOperation({
    summary: 'Habilita o inhabilita el rol',
  })
  cambiarDisponibilidad(@GetUser() @Param('id', ParseIntPipe) id: number) {
    return this.rolService.enable(id);
  }

  @Patch(':id/menus')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({
    summary: 'Asigna o quita un menu a un rol',
  })
  agregarOQuitarMenu(@Param('id', ParseIntPipe) id: number, @Body() createRolMenuDto: RolMenuDto) {
    return this.rolService.agregarOQuitarMenu(id, createRolMenuDto);
  }
}
