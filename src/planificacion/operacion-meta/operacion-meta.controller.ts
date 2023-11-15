import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OperacionMetaService } from './operacion-meta.service';
import { CreateOperacionMetaDto } from './dto/create-operacion-meta.dto';
import { UpdateOperacionMetaDto } from './dto/update-operacion-meta.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('operaciones-meta')
@ApiTags('operaciones-meta')
export class OperacionMetaController {
  constructor(private readonly operacionMetaService: OperacionMetaService) {}

  @Post()
  create(@Body() createOperacionMetaDto: CreateOperacionMetaDto) {
    return this.operacionMetaService.create(createOperacionMetaDto);
  }

  @Get()
  findAll() {
    return this.operacionMetaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.operacionMetaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOperacionMetaDto: UpdateOperacionMetaDto) {
    return this.operacionMetaService.update(+id, updateOperacionMetaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.operacionMetaService.remove(+id);
  }
}
