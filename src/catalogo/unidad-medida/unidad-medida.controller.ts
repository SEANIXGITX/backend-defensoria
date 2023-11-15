import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { UnidadMedidaService } from './unidad-medida.service';
import { CreateUnidadMedidaDto } from './dto/create-unidad-medida.dto';
import { UpdateUnidadMedidaDto } from './dto/update-unidad-medida.dto';
import { UnidadMedidaEntity } from './entities/unidad-medida.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiMessageResponse } from 'src/shared/decorators/api-message-response.decorator';
import { MessageResponse } from 'src/shared/entities/message-response';

@Controller('unidades-medida')
@ApiTags('Unidades-medida')
export class UnidadMedidaController {
  constructor(private readonly unidadMedidaService: UnidadMedidaService) {}

  @Post()
  create(@Body() createUnidadMedidaDto: CreateUnidadMedidaDto) {
    return this.unidadMedidaService.create(createUnidadMedidaDto);
  }

  @Get('listar')
  findAll() {
    return this.unidadMedidaService.findAll();
  }

  @Get()
  @ApiOperation({ summary: 'listado de las unidades de medida habilitados' })
  @ApiMessageResponse({ status: HttpStatus.OK, model: UnidadMedidaEntity, isArray: true })
  lista(): Promise<MessageResponse<UnidadMedidaEntity[]>> {
    return this.unidadMedidaService.listar();
  }
  @Get(':idUnidadMedida')
  findOne(@Param('idUnidadMedida') idUnidadMedida: string) {
    return this.unidadMedidaService.findOne(+idUnidadMedida);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUnidadMedidaDto: UpdateUnidadMedidaDto) {
    return this.unidadMedidaService.update(+id, updateUnidadMedidaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.unidadMedidaService.remove(+id);
  }
}
