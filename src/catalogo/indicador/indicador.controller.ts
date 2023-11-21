import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { IndicadorService } from './indicador.service';
import { CreateIndicadorDto } from './dto/create-indicador.dto';
import { UpdateIndicadorDto } from './dto/update-indicador.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiMessageResponse } from 'src/shared/decorators/api-message-response.decorator';
import { IndicadorEntity } from './entities/indicador.entity';
import { MessageResponse } from 'src/shared/entities/message-response';

@Controller('indicadores')
@ApiTags('indicadores')
export class IndicadorController {
  constructor(private readonly indicadorService: IndicadorService) {}

  /*
  @Post()
  create(@Body() createIndicadorDto: CreateIndicadorDto) {
    return this.indicadorService.create(createIndicadorDto);
  }*/

  @Get()
  @ApiOperation({ summary: 'listado de los indicadores habilitados' })
  @ApiMessageResponse({ status: HttpStatus.OK, model: IndicadorEntity, isArray: true })
  lista(): Promise<MessageResponse<IndicadorEntity[]>> {
    return this.indicadorService.listar();
  }
  /*
  @Get()
  findAll() {
    return this.indicadorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.indicadorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIndicadorDto: UpdateIndicadorDto) {
    return this.indicadorService.update(+id, updateIndicadorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.indicadorService.remove(+id);
  }*/
}
