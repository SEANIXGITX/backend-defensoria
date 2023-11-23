import { Test, TestingModule } from '@nestjs/testing';
import { SolicitudDetalleEspecificacionTecnicaController } from './solicitud-detalle-especificacion-tecnica.controller';
import { SolicitudDetalleEspecificacionTecnicaService } from './solicitud-detalle-especificacion-tecnica.service';

describe('SolicitudDetalleEspecificacionTecnicaController', () => {
  let controller: SolicitudDetalleEspecificacionTecnicaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SolicitudDetalleEspecificacionTecnicaController],
      providers: [SolicitudDetalleEspecificacionTecnicaService],
    }).compile();

    controller = module.get<SolicitudDetalleEspecificacionTecnicaController>(SolicitudDetalleEspecificacionTecnicaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
