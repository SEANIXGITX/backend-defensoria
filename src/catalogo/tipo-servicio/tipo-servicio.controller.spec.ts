import { Test, TestingModule } from '@nestjs/testing';
import { TipoServicioController } from './tipo-servicio.controller';
import { TipoServicioService } from './tipo-servicio.service';

describe('TipoServicioController', () => {
  let controller: TipoServicioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoServicioController],
      providers: [TipoServicioService],
    }).compile();

    controller = module.get<TipoServicioController>(TipoServicioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
