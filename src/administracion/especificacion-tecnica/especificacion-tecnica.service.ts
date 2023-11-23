import { HttpStatus, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateEspecificacionTecnicaDto } from './dto/create-especificacion-tecnica.dto';
import { UpdateEspecificacionTecnicaDto } from './dto/update-especificacion-tecnica.dto';
import { MessageResponse } from 'src/shared/entities/message-response';
import { EspecificacionTecnicaEntity } from './entities/especificacion-tecnica.entity';
import { Repository } from 'typeorm';
import { MessageEnum } from 'src/shared/enums/message.enum';
import { EstadoEnum } from 'src/shared/enums/estado.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { FormularioService } from 'src/catalogo/formulario/formulario.service';

@Injectable()
export class EspecificacionTecnicaService {
  entityNameMessage = 'Especificacion Tecnica';

  constructor(
    @InjectRepository(EspecificacionTecnicaEntity) private espTecnicaRepository: Repository<EspecificacionTecnicaEntity>,
    private formularioServ: FormularioService,
  ) {}

  async create(createEspecificacionTecnicaDto: CreateEspecificacionTecnicaDto) {
    //const valores = [{ concepto: 'ddd', modalidad: 'cccc', seleccion: 'cccc' }];
    const valores = createEspecificacionTecnicaDto;
    const solicitud = valores.solicitudId;
    delete valores.solicitudId
    for (const atributo in valores) {
      console.log(atributo, valores[atributo]); // Esto imprimirá los nombres de los atributos
      const element = {
        clave: atributo,
        valor: valores[atributo],
        solicitudId: solicitud,
        estadoId: EstadoEnum.ORIGINAL,
      };

      const nuevo = this.espTecnicaRepository.create(element as EspecificacionTecnicaEntity);

      await this.espTecnicaRepository.save(nuevo).catch(e => {
        throw new UnprocessableEntityException(e.message, 'Error al crear registro');
      });
    }
    return new MessageResponse(HttpStatus.CREATED, 'El registro fue creado correctamente.', valores);
  }

  findAll() {
    return 'dd';
  }

  async findOne(solicitudId: number): Promise<any> {
    const ESPECIFICACIONES_TECNICAS = 1;
    const columnas = await this.formularioServ.listarColumnas(ESPECIFICACIONES_TECNICAS);
    let auxColumnas = '';
    for (let index = 0; index < columnas.data.length; index++) {
      const element = columnas.data[index];
      auxColumnas += element.clave + ' text, ';
    }
    auxColumnas = 'solicitud_id int8, ' + auxColumnas.substring(0, auxColumnas.length - 2);
    let aux = `SELECT * FROM crosstab(
                    'SELECT solicitudId, clave, valor FROM administracion.especificaciones_tecnica et ORDER BY 1,2',
                    'SELECT DISTINCT solicitudId FROM administracion.especificaciones_tecnica ORDER BY 1'
                  ) AS final_result(${auxColumnas});`;

    const datos = await this.espTecnicaRepository.query(`SELECT * FROM crosstab(
          'SELECT solicitud_id, clave, valor FROM administracion.especificaciones_tecnica et where solicitud_id = ${solicitudId}  ORDER BY 1,2') AS final_result(${auxColumnas});
        `);

    return new MessageResponse(HttpStatus.OK, MessageEnum.ENTITY_SELECT, datos);

  }

  update(id: number, updateEspecificacionTecnicaDto: UpdateEspecificacionTecnicaDto) {
    return `This action updates a #${id} especificacionTecnica`;
  }

  remove(id: number) {
    return `This action removes a #${id} especificacionTecnica`;
  }
}
