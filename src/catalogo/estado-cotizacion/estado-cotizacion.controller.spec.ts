import { Test, TestingModule } from '@nestjs/testing';
import { EstadoCotizacionController } from './estado-cotizacion.controller';
import { EstadoCotizacionService } from './estado-cotizacion.service';

describe('EstadoCotizacionController', () => {
  let controller: EstadoCotizacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstadoCotizacionController],
      providers: [EstadoCotizacionService],
    }).compile();

    controller = module.get<EstadoCotizacionController>(EstadoCotizacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
