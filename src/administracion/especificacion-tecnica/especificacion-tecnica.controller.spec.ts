import { Test, TestingModule } from '@nestjs/testing';
import { EspecificacionTecnicaController } from './especificacion-tecnica.controller';
import { EspecificacionTecnicaService } from './especificacion-tecnica.service';

describe('EspecificacionTecnicaController', () => {
  let controller: EspecificacionTecnicaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EspecificacionTecnicaController],
      providers: [EspecificacionTecnicaService],
    }).compile();

    controller = module.get<EspecificacionTecnicaController>(EspecificacionTecnicaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
