import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MessageResponse } from '../../shared/entities/message-response';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateUsuarioRolDto } from './dto/create-usuario-rol-dto';
import { UsuarioRolEntity } from './entities/usuario-rol.entity';
import { UsuarioRolService } from './usuario-rol.service';

@ApiTags('Usuario - Rol')
@ApiBearerAuth()
@Controller('usuarios-rol')
//@UseGuards(JwtAuthGuard)
export class UsuarioRolController {
  constructor(private usuarioRolService: UsuarioRolService) {}

  @Get()
  @ApiOperation({ summary: 'Lista los roles de un usuario', description: 'Dato requerido idUsuario' })
  obtenerRolPorUsuario(@Query('idUsuario', ParseIntPipe) idUsuario: number) {
    return this.usuarioRolService.obtenerRolesPorIdUsuario(idUsuario);
  }

  @Post()
  @ApiOperation({ summary: 'Asignacion del rol a usuario', description: 'datos requerido idUsuario e idRol' })
  createUsuarioRol(@Body() createUsuarioRolDto: CreateUsuarioRolDto): Promise<MessageResponse<UsuarioRolEntity>> {
    return this.usuarioRolService.crearRolUsuario(createUsuarioRolDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminacion de rol de un usuario', description: 'datos requerido el identificador de registro' })
  eliminarUsuarioRoles(@Param('id', ParseIntPipe) id: number): Promise<MessageResponse<{ id: number }>> {
    return this.usuarioRolService.eliminarUsuarioRol(id);
  }
}
