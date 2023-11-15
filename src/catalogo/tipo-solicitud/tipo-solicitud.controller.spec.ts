import { Test, TestingModule } from '@nestjs/testing';
import { TipoSolicitudController } from './tipo-solicitud.controller';
import { TipoSolicitudService } from './tipo-solicitud.service';

describe('TipoSolicitudController', () => {
  let controller: TipoSolicitudController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoSolicitudController],
      providers: [TipoSolicitudService],
    }).compile();

    controller = module.get<TipoSolicitudController>(TipoSolicitudController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
