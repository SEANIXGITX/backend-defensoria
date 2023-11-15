import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OperacionObservacionService } from './operacion-observacion.service';
import { CreateOperacionObservacionDto } from './dto/create-operacion-observacion.dto';
import { UpdateOperacionObservacionDto } from './dto/update-operacion-observacion.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('operaciones-observacion')
@ApiTags('operaciones-observacion')
export class OperacionObservacionController {
  constructor(private readonly operacionObservacionService: OperacionObservacionService) {}

  @Post()
  create(@Body() createOperacionObservacionDto: CreateOperacionObservacionDto) {
    return this.operacionObservacionService.create(createOperacionObservacionDto);
  }

  @Get()
  findAll() {
    return this.operacionObservacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.operacionObservacionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOperacionObservacionDto: UpdateOperacionObservacionDto) {
    return this.operacionObservacionService.update(+id, updateOperacionObservacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.operacionObservacionService.remove(+id);
  }
}
