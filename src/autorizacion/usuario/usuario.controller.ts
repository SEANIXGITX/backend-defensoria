import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginationResult } from 'src/shared/entities/pagination-result';
import { ApiExtraMessageResponse, ApiMessageResponse } from '../../shared/decorators/api-message-response.decorator';
import { MessageResponse } from '../../shared/entities/message-response';
import { MessageEnum } from '../../shared/enums/message.enum';
import { Public } from '../auth/decorators/auth-public.decorator';
import { RoleGuard } from '../auth/guards/roles.guard';
import { CreateUsuarioRolDto } from './dto/create-usuario-rol-dto';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { PasswordUsuarioDto } from './dto/password-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UsuarioEntity } from './entities/usuario.entity';
import { UsuarioService } from './usuario.service';

@Controller('usuarios')
@ApiTags('usuarios')
//@ApiBearerAuth()
//@UseGuards(JwtAuthGuard, RoleGuard(RolEnum.ADMIN))
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  //@Roles(RolEnum.ADMIN)
  //@UseGuards(RoleGuard)

  @Post()
  @Public()
  @ApiOperation({ summary: 'Crea datos de un nuevo usuario' })
  @ApiMessageResponse({ status: HttpStatus.CREATED, description: MessageEnum.CREATED, model: UsuarioEntity })
  create(@Body() createUsuarioDto: CreateUsuarioDto): Promise<MessageResponse<UsuarioEntity>> {
    return this.usuarioService.create(createUsuarioDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtiene el listado de datos de los Usuarios activos' })
  @ApiMessageResponse({ status: HttpStatus.OK, model: UsuarioEntity, isArray: true })
  findAll(): Promise<MessageResponse<UsuarioEntity[]>> {
    return this.usuarioService.findAll();
  }

  @UseGuards(RoleGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Obtiene los datos de un Usuario' })
  @ApiMessageResponse({ status: HttpStatus.OK, description: MessageEnum.ENTITY_SELECT, model: UsuarioEntity })
  @ApiExtraMessageResponse([HttpStatus.NOT_FOUND])
  findOne(@Param('id', ParseIntPipe) id: number): Promise<MessageResponse<UsuarioEntity>> {
    return this.usuarioService.findOne(id);
  }

  @UseGuards(RoleGuard)
  @Get('u/:usuario')
  @ApiOperation({ summary: 'Obtiene los datos de un Usuario en base al campo usuario' })
  @ApiMessageResponse({ status: HttpStatus.OK, description: MessageEnum.ENTITY_SELECT, model: UsuarioEntity })
  @ApiExtraMessageResponse([HttpStatus.NOT_FOUND])
  findOneByUser(@Param('usuario') usuario: string): Promise<MessageResponse<UsuarioEntity>> {
    return this.usuarioService.findOneByUser(usuario);
  }

  @Patch('habilitar/:id')
  @ApiOperation({ summary: 'Habilita/Deshabilita un Usuario' })
  @ApiMessageResponse({ status: HttpStatus.OK, description: MessageEnum.ENABLED, model: '{id, habilitado}' })
  @ApiExtraMessageResponse([HttpStatus.NOT_FOUND])
  enable(@Param('id', ParseIntPipe) id: number): Promise<MessageResponse<{ id: number; habilitado: boolean }>> {
    return this.usuarioService.enable(id);
  }

  @Patch('resetpassword/:id')
  @ApiOperation({ summary: 'Restablece la contraseña de un Usuario activo' })
  @ApiMessageResponse({ status: HttpStatus.OK, description: MessageEnum.UPDATED, model: '{id}' })
  @ApiExtraMessageResponse([HttpStatus.NOT_FOUND])
  resetPassword(@Param('id', ParseIntPipe) id: number): Promise<MessageResponse<{ id: number }>> {
    return this.usuarioService.changePassword(id, process.env.DEFAULT_PASS);
  }

  @Patch('changepassword/:id')
  @ApiOperation({ summary: 'Cambio de contraseña de un Usuario activo' })
  @ApiMessageResponse({ status: HttpStatus.OK, description: MessageEnum.UPDATED, model: '{id}' })
  @ApiExtraMessageResponse([HttpStatus.NOT_FOUND])
  changePassword(@Param('id', ParseIntPipe) id: number, @Body() usuarioDto: PasswordUsuarioDto): Promise<MessageResponse<{ id: number }>> {
    return this.usuarioService.changePassword(id, usuarioDto.clave);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Elimina logicamente los datos de un Usuario' })
  @ApiMessageResponse({ status: HttpStatus.OK, description: MessageEnum.DELETED, model: '{id}' })
  @ApiExtraMessageResponse([HttpStatus.NOT_FOUND])
  remove(@Param('id', ParseIntPipe) id: number): Promise<MessageResponse<{ id: number }>> {
    return this.usuarioService.remove(id);
  }

  @Post('listar')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtiene el listado de usuarios con Paginación' })
  @ApiMessageResponse({ status: HttpStatus.OK, model: PaginationResult, isArray: true })
  list(@Body() optionsPage: PaginationDto): Promise<MessageResponse<PaginationResult>> {
    return this.usuarioService.list(optionsPage);
  }

  @Patch(':id/roles')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({
    summary: 'Asigna o quita un roles a un usuario',
  })
  agregarOQuitarRoles(@Param('id', ParseIntPipe) id: number, @Body() createRolMenuDto: CreateUsuarioRolDto) {
    return this.usuarioService.agregarOQuitarRoles(id, createRolMenuDto);
  }

  @Patch(':id/clave')
  @ApiOperation({
    summary: 'Restablece la clave de un usuario.',
  })
  async restablecerClave(@Param('id', ParseIntPipe) id: number) {
    return this.usuarioService.restablecesClave(id);
  }
}
