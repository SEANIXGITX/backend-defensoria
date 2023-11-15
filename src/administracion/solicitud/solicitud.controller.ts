import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode, ParseIntPipe } from '@nestjs/common';
import { SolicitudService } from './solicitud.service';
import { CreateSolicitudDto } from './dto/create-solicitud.dto';
import { UpdateSolicitudDto } from './dto/update-solicitud.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SolicitudEntity } from './entities/solicitud.entity';
import { MessageResponse } from 'src/shared/entities/message-response';
import { ApiExtraMessageResponse, ApiMessageResponse } from 'src/shared/decorators/api-message-response.decorator';
import { PaginationResult } from 'src/shared/entities/pagination-result';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { MessageEnum } from 'src/shared/enums/message.enum';

@Controller('solicitudes')
@ApiTags('Solicitudes')
export class SolicitudController {
  constructor(private readonly solicitudService: SolicitudService) {}

  @Post()
  @ApiOperation({ summary: 'Crea una nueva solicitud' })
  @ApiMessageResponse({ status: HttpStatus.CREATED, model: SolicitudEntity })
  create(@Body() createSolicitudDto: CreateSolicitudDto): Promise<MessageResponse<SolicitudEntity>> {
    return this.solicitudService.create(createSolicitudDto);
  }

  @Post('listar/:idTipoSolicitud')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtiene el listado de las solicitudes con Paginación por tipo de solicitud' })
  @ApiMessageResponse({ status: HttpStatus.OK, model: PaginationResult, isArray: true })
  listar(
    @Body() optionsPage: PaginationDto,
    @Param('idTipoSolicitud', ParseIntPipe) idTipoSolicitud: number,
  ): Promise<MessageResponse<PaginationResult>> {
    return this.solicitudService.findAll(optionsPage, idTipoSolicitud);
  }

  @Get(':idSolicitud')
  @ApiOperation({ summary: 'Obtiene todos los datos de una Solicitud' })
  @ApiMessageResponse({ status: HttpStatus.OK, description: MessageEnum.ENTITY_SELECT, model: SolicitudEntity })
  @ApiExtraMessageResponse([HttpStatus.NOT_FOUND])
  findOne(@Param('idSolicitud', ParseIntPipe) idSolicitud: number) {
    return this.solicitudService.findOne(idSolicitud);
  }

  @Patch(':idSolicitud')
  @ApiOperation({ summary: 'Modifica los datos de una Solicitud' })
  @ApiMessageResponse({ status: HttpStatus.OK, description: MessageEnum.UPDATED, model: SolicitudEntity })
  @ApiExtraMessageResponse([HttpStatus.NOT_FOUND])
  update(@Param('idSolicitud') idSolicitud: string, @Body() updateSolicitudDto: UpdateSolicitudDto) {
    return this.solicitudService.update(+idSolicitud, updateSolicitudDto);
  }

  @Delete(':idSolicitud')
  @ApiOperation({ summary: 'Elimina logicamente una solicitud' })
  @ApiMessageResponse({ status: HttpStatus.OK, description: MessageEnum.DELETED, model: '{idSolicitud}' })
  @ApiExtraMessageResponse([HttpStatus.NOT_FOUND])
  remove(@Param('idSolicitud') idSolicitud: string) {
    return this.solicitudService.remove(+idSolicitud);
  }
}
