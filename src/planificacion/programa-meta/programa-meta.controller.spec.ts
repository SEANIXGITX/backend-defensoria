import { Test, TestingModule } from '@nestjs/testing';
import { ProgramaMetaController } from './programa-meta.controller';
import { ProgramaMetaService } from './programa-meta.service';

describe('ProgramaMetaController', () => {
  let controller: ProgramaMetaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProgramaMetaController],
      providers: [ProgramaMetaService],
    }).compile();

    controller = module.get<ProgramaMetaController>(ProgramaMetaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
