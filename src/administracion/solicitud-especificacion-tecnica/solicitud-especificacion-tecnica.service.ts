import { SolicitudDetalleEspecificacionTecnicaEntity } from './../solicitud-detalle-especificacion-tecnica/entities/solicitud-detalle-especificacion-tecnica.entity';
import { Injectable, UnprocessableEntityException, HttpStatus } from '@nestjs/common';
import { CreateSolicitudEspecificacionTecnicaDto } from './dto/create-solicitud-especificacion-tecnica.dto';
import { UpdateSolicitudEspecificacionTecnicaDto } from './dto/update-solicitud-especificacion-tecnica.dto';
import { EstadoEnum } from 'src/shared/enums/estado.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SolicitudEspecificacionTecnicaEntity } from './entities/solicitud-especificacion-tecnica.entity';
import { MessageResponse } from 'src/shared/entities/message-response';
import { FormularioService } from 'src/catalogo/formulario/formulario.service';
import { MessageEnum } from 'src/shared/enums/message.enum';


@Injectable()
export class SolicitudEspecificacionTecnicaService {
  entityNameMessage = 'Solicitud Especificacion Tecnica';

  constructor(
    @InjectRepository(SolicitudDetalleEspecificacionTecnicaEntity)
    private detalleRepository: Repository<SolicitudDetalleEspecificacionTecnicaEntity>,
    @InjectRepository(SolicitudEspecificacionTecnicaEntity) private solicitudRepository: Repository<SolicitudEspecificacionTecnicaEntity>,
    private formularioServicio: FormularioService,
  ) {}
  async create(crearEspecificacionDto: CreateSolicitudEspecificacionTecnicaDto) {
    //const valores = [{ concepto: 'ddd', modalidad: 'cccc', seleccion: 'cccc' }];
    const SECCION_CARACTERISTICAS = 'caracteristicas';
    const valores = crearEspecificacionDto;
    const solicitud = valores.solicitudId;
    delete valores.solicitudId;
    for (const atributo in valores) {
      console.log(atributo, valores[atributo]); // Esto imprimirá los nombres de los atributos
      const element = {
        clave: atributo,
        valor: valores[atributo],
        solicitudId: solicitud,
        estadoId: EstadoEnum.ORIGINAL,
      };
      if (atributo == SECCION_CARACTERISTICAS) {
        for (let index = 0; index < crearEspecificacionDto.caracteristicas.length; index++) {
          const valoresDetalle = crearEspecificacionDto.caracteristicas[index];
          const solicitudDetalleId = crearEspecificacionDto.caracteristicas[index].solicitudDetalleId;
          delete valoresDetalle.solicitudDetalleId;
          for (const atributoDetalle in valoresDetalle) {
            const elementDetalle = {
              clave: atributoDetalle,
              valor: valoresDetalle[atributoDetalle],
              solicitudDetalleId,
              estadoId: EstadoEnum.ORIGINAL,
            };
            const nuevo = this.detalleRepository.create(elementDetalle as SolicitudDetalleEspecificacionTecnicaEntity);

            await this.detalleRepository.save(nuevo).catch(e => {
              throw new UnprocessableEntityException(e.message, 'Error al crear registro');
            });
          }
        }
      } else {
        const nuevo = this.solicitudRepository.create(element as SolicitudEspecificacionTecnicaEntity);

        await this.solicitudRepository.save(nuevo).catch(e => {
          throw new UnprocessableEntityException(e.message, 'Error al crear registro');
        });
      }
    }
    return new MessageResponse(HttpStatus.CREATED, 'El registro fue creado correctamente.', valores);
  }

  findAll() {
    return `This action returns all solicitudEspecificacionTecnica`;
  }

  async findOne(solicitudId: number): Promise<any> {
    const ESPECIFICACIONES_TECNICAS = 1;
    const columnas = await this.formularioServicio.listarColumnas(ESPECIFICACIONES_TECNICAS, 0);
    let auxColumnas = '';
    for (let index = 0; index < columnas.data.length; index++) {
      const element = columnas.data[index];
      auxColumnas += element.clave + ' text, ';
    }
    auxColumnas = 'solicitud_id int8, ' + auxColumnas.substring(0, auxColumnas.length - 2);
    let aux = `SELECT * FROM crosstab(
                    'SELECT solicitudId, clave, valor FROM administracion.solicitudes_especificacion et ORDER BY 1,2',
                    'SELECT DISTINCT solicitudId FROM administracion.solicitudes_especificacion ORDER BY 1'
                  ) AS final_result(${auxColumnas});`;

    const datos = await this.solicitudRepository.query(`SELECT * FROM crosstab(
          'SELECT solicitud_id, clave, valor FROM administracion.solicitudes_especificacion et where solicitud_id = ${solicitudId}  ORDER BY id,2') AS final_result(${auxColumnas});
        `);

    return new MessageResponse(HttpStatus.OK, MessageEnum.ENTITY_SELECT, datos);

  }

  update(id: number, updateSolicitudEspecificacionTecnicaDto: UpdateSolicitudEspecificacionTecnicaDto) {
    return `This action updates a #${id} solicitudEspecificacionTecnica`;
  }

  remove(id: number) {
    return `This action removes a #${id} solicitudEspecificacionTecnica`;
  }
}
