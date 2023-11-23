import { Injectable } from '@nestjs/common';
import { CreateSolicitudDetalleEspecificacionTecnicaDto } from './dto/create-solicitud-detalle-especificacion-tecnica.dto';
import { UpdateSolicitudDetalleEspecificacionTecnicaDto } from './dto/update-solicitud-detalle-especificacion-tecnica.dto';

@Injectable()
export class SolicitudDetalleEspecificacionTecnicaService {
  create(createSolicitudDetalleEspecificacionTecnicaDto: CreateSolicitudDetalleEspecificacionTecnicaDto) {
    return 'This action adds a new solicitudDetalleEspecificacionTecnica';
  }

  findAll() {
    return `This action returns all solicitudDetalleEspecificacionTecnica`;
  }

  findOne(id: number) {
    return `This action returns a #${id} solicitudDetalleEspecificacionTecnica`;
  }

  update(id: number, updateSolicitudDetalleEspecificacionTecnicaDto: UpdateSolicitudDetalleEspecificacionTecnicaDto) {
    return `This action updates a #${id} solicitudDetalleEspecificacionTecnica`;
  }

  remove(id: number) {
    return `This action removes a #${id} solicitudDetalleEspecificacionTecnica`;
  }
}
