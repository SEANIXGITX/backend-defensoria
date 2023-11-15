import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiExtraMessageResponse, ApiMessageResponse } from 'src/shared/decorators/api-message-response.decorator';
import { MessageEnum } from 'src/shared/enums/message.enum';
import { ProductoEntity } from './entities/producto.entity';

@Controller('productos')
@ApiTags('Productos')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  /*
  @Post()
  create(@Body() createProductoDto: CreateProductoDto) {
    return this.productoService.create(createProductoDto);
  }

  @Get()
  findAll() {
    return this.productoService.findAll();
  }*/

  @Get('/proyecto/:idProyecto')
  @ApiOperation({ summary: 'Listado de productos por identificador de proyecto' })
  @ApiMessageResponse({ status: HttpStatus.OK, description: MessageEnum.ENTITY_SELECT, model: ProductoEntity })
  @ApiExtraMessageResponse([HttpStatus.NOT_FOUND])
  lista(@Param('idProyecto', ParseIntPipe) idProyecto: number) {
    return this.productoService.listaPorProyecto(idProyecto);
  }

  /*
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductoDto: UpdateProductoDto) {
    return this.productoService.update(+id, updateProductoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productoService.remove(+id);
  }*/
}
