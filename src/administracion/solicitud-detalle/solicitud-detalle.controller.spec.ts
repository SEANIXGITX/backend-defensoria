import { Test, TestingModule } from '@nestjs/testing';
import { SolicitudDetalleController } from './solicitud-detalle.controller';
import { SolicitudDetalleService } from './solicitud-detalle.service';

describe('SolicitudDetalleController', () => {
  let controller: SolicitudDetalleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SolicitudDetalleController],
      providers: [SolicitudDetalleService],
    }).compile();

    controller = module.get<SolicitudDetalleController>(SolicitudDetalleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
