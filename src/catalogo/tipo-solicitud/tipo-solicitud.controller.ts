import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { TipoSolicitudService } from './tipo-solicitud.service';
import { CreateTipoSolicitudDto } from './dto/create-tipo-solicitud.dto';
import { UpdateTipoSolicitudDto } from './dto/update-tipo-solicitud.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiMessageResponse } from 'src/shared/decorators/api-message-response.decorator';
import { MessageResponse } from 'src/shared/entities/message-response';
import { TipoSolicitudEntity } from './entities/tipo-solicitud.entity';

@Controller('tipos-solicitud')
@ApiTags('tipos-solicitud')
export class TipoSolicitudController {
  constructor(private readonly tipoSolicitudService: TipoSolicitudService) {}

  @Post()
  create(@Body() createTipoSolicitudDto: CreateTipoSolicitudDto) {
    return this.tipoSolicitudService.create(createTipoSolicitudDto);
  }

  @Get('listar')
  findAll() {
    return this.tipoSolicitudService.findAll();
  }

  @Get()
  @ApiOperation({ summary: 'listado de tipos de solicitudes habilitados' })
  @ApiMessageResponse({ status: HttpStatus.OK, model: TipoSolicitudEntity, isArray: true })
  lista(): Promise<MessageResponse<TipoSolicitudEntity[]>> {
    return this.tipoSolicitudService.listar();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoSolicitudService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTipoSolicitudDto: UpdateTipoSolicitudDto) {
    return this.tipoSolicitudService.update(+id, updateTipoSolicitudDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoSolicitudService.remove(+id);
  }
}
