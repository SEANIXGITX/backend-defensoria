import { Test, TestingModule } from '@nestjs/testing';
import { SolicitudEspecificacionTecnicaController } from './solicitud-especificacion-tecnica.controller';
import { SolicitudEspecificacionTecnicaService } from './solicitud-especificacion-tecnica.service';

describe('SolicitudEspecificacionTecnicaController', () => {
  let controller: SolicitudEspecificacionTecnicaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SolicitudEspecificacionTecnicaController],
      providers: [SolicitudEspecificacionTecnicaService],
    }).compile();

    controller = module.get<SolicitudEspecificacionTecnicaController>(SolicitudEspecificacionTecnicaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
