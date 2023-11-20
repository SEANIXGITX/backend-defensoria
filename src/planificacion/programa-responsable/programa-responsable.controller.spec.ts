import { Test, TestingModule } from '@nestjs/testing';
import { ProgramaResponsableController } from './programa-responsable.controller';
import { ProgramaResponsableService } from './programa-responsable.service';

describe('ProgramaResponsableController', () => {
  let controller: ProgramaResponsableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProgramaResponsableController],
      providers: [ProgramaResponsableService],
    }).compile();

    controller = module.get<ProgramaResponsableController>(ProgramaResponsableController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
