import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { OperacionService } from './operacion.service';
import { CreateOperacionDto } from './dto/create-operacion.dto';
import { UpdateOperacionDto } from './dto/update-operacion.dto';
import { OperacionEntity } from './entities/operacion.entity';
import { MessageResponse } from 'src/shared/entities/message-response';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiExtraMessageResponse, ApiMessageResponse } from 'src/shared/decorators/api-message-response.decorator';
import { MessageEnum } from 'src/shared/enums/message.enum';

@Controller('operaciones')
@ApiTags('Operaciones')
export class OperacionController {
  constructor(private readonly operacionService: OperacionService) {}

  @Post()
  create(@Body() createOperacionDto: CreateOperacionDto) {
    return this.operacionService.create(createOperacionDto);
  }

  @Get('listar')
  findAll() {
    return this.operacionService.findAll();
  }

  @Get('unidad/:idUnidad')
  @ApiOperation({ summary: 'Obtiene el listado de operaciones por unidad', description: '' })
  @ApiMessageResponse({ status: HttpStatus.OK, model: OperacionEntity, isArray: true })
  findPorOperacion(@Param('idUnidad', ParseIntPipe) idUnidad: number): Promise<MessageResponse<OperacionEntity[]>> {
    return this.operacionService.listar(idUnidad);
  }

  @Get('/producto/:idProducto')
  @ApiOperation({ summary: 'Listado de operaciones por identificador de producto' })
  @ApiMessageResponse({ status: HttpStatus.OK, description: MessageEnum.ENTITY_SELECT, model: OperacionEntity })
  @ApiExtraMessageResponse([HttpStatus.NOT_FOUND])
  lista(@Param('idProducto', ParseIntPipe) idProducto: number): Promise<MessageResponse<OperacionEntity[]>> {
    return this.operacionService.listaPorProducto(idProducto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOperacionDto: UpdateOperacionDto) {
    return this.operacionService.update(+id, updateOperacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.operacionService.remove(+id);
  }
}
