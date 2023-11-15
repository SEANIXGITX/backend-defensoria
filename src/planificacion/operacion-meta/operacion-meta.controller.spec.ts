import { Test, TestingModule } from '@nestjs/testing';
import { OperacionMetaController } from './operacion-meta.controller';
import { OperacionMetaService } from './operacion-meta.service';

describe('OperacionMetaController', () => {
  let controller: OperacionMetaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OperacionMetaController],
      providers: [OperacionMetaService],
    }).compile();

    controller = module.get<OperacionMetaController>(OperacionMetaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
