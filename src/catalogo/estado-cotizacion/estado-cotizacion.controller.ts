import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstadoCotizacionService } from './estado-cotizacion.service';
import { CreateEstadoCotizacionDto } from './dto/create-estado-cotizacion.dto';
import { UpdateEstadoCotizacionDto } from './dto/update-estado-cotizacion.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('estados-cotizacion')
@ApiTags('estados-cotizacion')
export class EstadoCotizacionController {
  constructor(private readonly estadoCotizacionService: EstadoCotizacionService) {}

  @Post()
  create(@Body() createEstadoCotizacionDto: CreateEstadoCotizacionDto) {
    return this.estadoCotizacionService.create(createEstadoCotizacionDto);
  }

  @Get()
  findAll() {
    return this.estadoCotizacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estadoCotizacionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEstadoCotizacionDto: UpdateEstadoCotizacionDto) {
    return this.estadoCotizacionService.update(+id, updateEstadoCotizacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estadoCotizacionService.remove(+id);
  }
}
