import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpStatus, HttpCode } from '@nestjs/common';
import { PeriodoService } from './periodo.service';
import { CreatePeriodoDto } from './dto/create-periodo.dto';
import { UpdatePeriodoDto } from './dto/update-periodo.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiExtraMessageResponse, ApiMessageResponse } from 'src/shared/decorators/api-message-response.decorator';
import { MessageEnum } from 'src/shared/enums/message.enum';
import { PeriodoEntity } from './entities/periodo.entity';
import { PaginationResult } from 'src/shared/entities/pagination-result';
import { MessageResponse } from 'src/shared/entities/message-response';
import { PaginationDto } from 'src/shared/dto/pagination.dto';

@Controller('periodos')
@ApiTags('periodos')
export class PeriodoController {
  constructor(private readonly periodoService: PeriodoService) {}
  /*
  @Post()
  create(@Body() createPeriodoDto: CreatePeriodoDto) {
    return this.periodoService.create(createPeriodoDto);
  }*/

  @Post('listar')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtiene el listado de los periodos' })
  @ApiMessageResponse({ status: HttpStatus.OK, model: PaginationResult, isArray: true })
  listar(@Body() optionsPage: PaginationDto): Promise<MessageResponse<PaginationResult>> {
    return this.periodoService.findAll(optionsPage);
  }

  @Get(':tipoId')
  @ApiOperation({ summary: 'Obtiene los periodos de un tipo especifico' })
  @ApiMessageResponse({ status: HttpStatus.OK, description: MessageEnum.ENTITY_SELECT, model: PeriodoEntity })
  @ApiExtraMessageResponse([HttpStatus.NOT_FOUND])
  listaPorTipo(@Param('tipoId', ParseIntPipe) tipoId: number) {
    return this.periodoService.listaPorTipo(tipoId);
  }
  
  /*
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePeriodoDto: UpdatePeriodoDto) {
    return this.periodoService.update(+id, updatePeriodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.periodoService.remove(+id);
  }*/
}
