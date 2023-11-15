import { Test, TestingModule } from '@nestjs/testing';
import { ProgramaIncumplimientoController } from './programa-incumplimiento.controller';
import { ProgramaIncumplimientoService } from './programa-incumplimiento.service';

describe('ProgramaIncumplimientoController', () => {
  let controller: ProgramaIncumplimientoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProgramaIncumplimientoController],
      providers: [ProgramaIncumplimientoService],
    }).compile();

    controller = module.get<ProgramaIncumplimientoController>(ProgramaIncumplimientoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
