import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { ProgramaResponsableService } from './programa-responsable.service';
import { CreateProgramaResponsableDto } from './dto/create-programa-responsable.dto';
import { UpdateProgramaResponsableDto } from './dto/update-programa-responsable.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiMessageResponse } from 'src/shared/decorators/api-message-response.decorator';
import { MessageEnum } from 'src/shared/enums/message.enum';
import { ProgramaResponsableEntity } from './entities/programa-responsable.entity';

@Controller('programas-responsable')
@ApiTags('programas-responsable')
export class ProgramaResponsableController {
  constructor(private readonly programaResponsableService: ProgramaResponsableService) {}

  @Post()
  @ApiOperation({ summary: 'Crea los responsables de un programa' })
  @ApiMessageResponse({ status: HttpStatus.CREATED, description: MessageEnum.CREATED, model: ProgramaResponsableEntity })
  create(@Body() createProgramaResponsableDto: CreateProgramaResponsableDto[]) {
    return this.programaResponsableService.create(createProgramaResponsableDto);
  }

  /* @Get()
  findAll() {
    return this.programaResponsableService.findAll();
  } */

  @Get('programas/:idPrograma')
  @ApiOperation({ summary: 'listado de los responsables por programa' })
  porPrograma(@Param('idPrograma', ParseIntPipe) idPrograma: number) {
    return this.programaResponsableService.listarPorPrograma(idPrograma);
  }

 /* @Patch(':id')
  update(@Param('id') id: string, @Body() updateProgramaResponsableDto: UpdateProgramaResponsableDto) {
    return this.programaResponsableService.update(+id, updateProgramaResponsableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.programaResponsableService.remove(+id);
  }*/
}
