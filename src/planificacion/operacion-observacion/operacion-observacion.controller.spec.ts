import { Test, TestingModule } from '@nestjs/testing';
import { OperacionObservacionController } from './operacion-observacion.controller';
import { OperacionObservacionService } from './operacion-observacion.service';

describe('OperacionObservacionController', () => {
  let controller: OperacionObservacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OperacionObservacionController],
      providers: [OperacionObservacionService],
    }).compile();

    controller = module.get<OperacionObservacionController>(OperacionObservacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
