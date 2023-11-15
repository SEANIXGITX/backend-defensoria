import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { CotizacionService } from './cotizacion.service';
import { CreateCotizacionDto } from './dto/create-cotizacion.dto';
import { UpdateCotizacionDto } from './dto/update-cotizacion.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiMessageResponse } from 'src/shared/decorators/api-message-response.decorator';
import { PaginationResult } from 'src/shared/entities/pagination-result';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { MessageResponse } from 'src/shared/entities/message-response';

@Controller('cotizaciones')
@ApiTags('Cotizaciones')
export class CotizacionController {
  constructor(private readonly cotizacionService: CotizacionService) {}

  @Post()
  create(@Body() createCotizacionDto: CreateCotizacionDto) {
    return this.cotizacionService.create(createCotizacionDto);
  }
  @Post('listar/:idSolicitud')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtiene el listado de las cotizaciones con Paginación por solicitud' })
  @ApiMessageResponse({ status: HttpStatus.OK, model: PaginationResult, isArray: true })
  listar(
    @Body() optionsPage: PaginationDto,
    @Param('idSolicitud', ParseIntPipe) idSolicitud: number,
  ): Promise<MessageResponse<PaginationResult>> {
    return this.cotizacionService.listaPorSolicitud(optionsPage, idSolicitud);
  }

  @Get()
  findAll() {
    return this.cotizacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cotizacionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCotizacionDto: UpdateCotizacionDto) {
    return this.cotizacionService.update(+id, updateCotizacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cotizacionService.remove(+id);
  }
}
