import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { SolicitudDetalleService } from './solicitud-detalle.service';
import { CreateSolicitudDetalleDto } from './dto/create-solicitud-detalle.dto';
import { UpdateSolicitudDetalleDto } from './dto/update-solicitud-detalle.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiMessageResponse } from 'src/shared/decorators/api-message-response.decorator';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginationResult } from 'src/shared/entities/pagination-result';
import { MessageResponse } from 'src/shared/entities/message-response';
import { SolicitudDetalleEntity } from './entities/solicitud-detalle.entity';

@Controller('solicitudes-detalle')
@ApiTags('solicitudes-detalle')
export class SolicitudDetalleController {
  constructor(private readonly solicitudDetalleService: SolicitudDetalleService) {}

  @Post()
  @ApiOperation({ summary: 'Crea un nuevo detalle de la solicitud' })
  @ApiMessageResponse({ status: HttpStatus.CREATED, model: SolicitudDetalleEntity })
  create(@Body() createSolicitudDetalleDto: CreateSolicitudDetalleDto) {
    return this.solicitudDetalleService.create(createSolicitudDetalleDto);
  }

  @Post('listar/solicitudes/:idSolicitud')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtiene el listado de los detalles de una solicitud con Paginación' })
  @ApiMessageResponse({ status: HttpStatus.OK, model: PaginationResult, isArray: true })
  listar(
    @Body() optionsPage: PaginationDto,
    @Param('idSolicitud', ParseIntPipe) idSolicitud: number,
  ): Promise<MessageResponse<PaginationResult>> {
    return this.solicitudDetalleService.findAll(optionsPage, idSolicitud);
  }

  @Get(':idSolicitudDetalle')
  @ApiOperation({ summary: 'Obtiene el listado de un detalle de solicitud' })
  findOne(@Param('idSolicitudDetalle', ParseIntPipe) idSolicitudDetalle: number) {
    return this.solicitudDetalleService.findOne(idSolicitudDetalle);
  }
  /*
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSolicitudDetalleDto: UpdateSolicitudDetalleDto) {
    return this.solicitudDetalleService.update(+id, updateSolicitudDetalleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.solicitudDetalleService.remove(+id);
  }*/
}
