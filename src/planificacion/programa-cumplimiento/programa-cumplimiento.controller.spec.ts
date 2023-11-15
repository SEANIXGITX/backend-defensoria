import { Test, TestingModule } from '@nestjs/testing';
import { ProgramaCumplimientoController } from './programa-cumplimiento.controller';
import { ProgramaCumplimientoService } from './programa-cumplimiento.service';

describe('ProgramaCumplimientoController', () => {
  let controller: ProgramaCumplimientoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProgramaCumplimientoController],
      providers: [ProgramaCumplimientoService],
    }).compile();

    controller = module.get<ProgramaCumplimientoController>(ProgramaCumplimientoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
