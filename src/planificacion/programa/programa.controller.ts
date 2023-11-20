import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { ProgramaService } from './programa.service';
import { CreateProgramaDto } from './dto/create-programa.dto';
import { UpdateProgramaDto } from './dto/update-programa.dto';
import { MessageResponse } from 'src/shared/entities/message-response';
import { PaginationResult } from 'src/shared/entities/pagination-result';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { ApiMessageResponse } from 'src/shared/decorators/api-message-response.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProgramaEntity } from './entities/programa.entity';
import { ListaProgramaDto } from './dto/ponderar.dto';
import { MessageEnum } from 'src/shared/enums/message.enum';
import { EjecutarProgramaDto } from './dto/ejecutar-programa.dto';

@Controller('programas')
@ApiTags('Programas')
export class ProgramaController {
  constructor(private readonly programaService: ProgramaService) {}

  @Post()
  @ApiOperation({ summary: 'Crea un nuevo programa' })
  @ApiMessageResponse({ status: HttpStatus.CREATED, description: MessageEnum.CREATED, model: ProgramaEntity })
  create(@Body() createProgramaDto: CreateProgramaDto) {
    return this.programaService.create(createProgramaDto);
  }

  @Post('listar')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtiene el listado de todos los programas con Paginación' })
  @ApiMessageResponse({ status: HttpStatus.OK, model: PaginationResult, isArray: true })
  listar(@Body() optionsPage: PaginationDto): Promise<MessageResponse<PaginationResult>> {
    return this.programaService.findAll(optionsPage);
  }

  @Post('listar/gestiones/:gestionId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtiene el listado de los programas por gestion con Paginación' })
  findAll(
    @Body() optionsPage: PaginationDto,
    @Param('gestionId', ParseIntPipe) gestionId: number,
  ): Promise<MessageResponse<PaginationResult>> {
    return this.programaService.listar(optionsPage, gestionId);
  }

  @Get('gestiones/:gestionId')
  @ApiOperation({ summary: 'listado de todos los programas de una gestion especifica', description: 'Por ejemplo para ponderar' })
  listaPorGestion(@Param('gestionId', ParseIntPipe) gestionId: number) {
    return this.programaService.listarParaPonderacion(gestionId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene el listado especifico de un programa' })
  findOne(@Param('id') id: string) {
    return this.programaService.findOne(+id);
  }

  @Post('ponderacion')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Graba las ponderaciones de todos los programas', description: 'Graba por identificador de programa' })
  @ApiMessageResponse({ status: HttpStatus.OK, description: MessageEnum.UPDATED, model: {} })
  grabaPonderacion(@Body() listaPrograma: ListaProgramaDto[]) {
    return this.programaService.grabaPonderacion(listaPrograma);
  }

  @Patch('/ejecucion/:id')
  @ApiOperation({ summary: 'graba la ejecucion de un programa' })
  ejecutar(@Param('id') id: string, @Body() ejecutarProgramaDto: EjecutarProgramaDto) {
    return this.programaService.ejecucion(+id, ejecutarProgramaDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'modificacion de un programa' })
  update(@Param('id') id: string, @Body() updateProgramaDto: UpdateProgramaDto) {
    return this.programaService.update(+id, updateProgramaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Borrado logico de un programa' })
  remove(@Param('id') id: string) {
    return this.programaService.remove(+id);
  }
}
