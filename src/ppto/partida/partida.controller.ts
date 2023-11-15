import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpStatus } from '@nestjs/common';
import { PartidaService } from './partida.service';
import { CreatePartidaDto } from './dto/create-partida.dto';
import { UpdatePartidaDto } from './dto/update-partida.dto';
import { MessageResponse } from 'src/shared/entities/message-response';
import { PartidaEntity } from './entities/partida.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiMessageResponse } from 'src/shared/decorators/api-message-response.decorator';
import { PresupuestoEntity } from '../presupuesto/entities/presupuesto.entity';

@Controller('partidas')
@ApiTags('Partidas')
export class PartidaController {
  constructor(private readonly partidaService: PartidaService) {}

  @Post()
  create(@Body() createPartidaDto: CreatePartidaDto) {
    return this.partidaService.create(createPartidaDto);
  }

  @Get()
  findAll() {
    return this.partidaService.findAll();
  }

  @Get('operacion/:idOperacion')
  @ApiOperation({ summary: 'Obtiene el listado de Partidas por operacion', description: '' })
  @ApiMessageResponse({ status: HttpStatus.OK, model: PartidaEntity, isArray: true })
  findPorOperacion(@Param('idOperacion', ParseIntPipe) idOperacion: number): Promise<MessageResponse<PresupuestoEntity[]>> {
    return this.partidaService.listaPorPartida(idOperacion);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.partidaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePartidaDto: UpdatePartidaDto) {
    return this.partidaService.update(+id, updatePartidaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.partidaService.remove(+id);
  }
}
