import { Test, TestingModule } from '@nestjs/testing';
import { ProgramaIncumplimientoService } from './programa-incumplimiento.service';

describe('ProgramaIncumplimientoService', () => {
  let service: ProgramaIncumplimientoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProgramaIncumplimientoService],
    }).compile();

    service = module.get<ProgramaIncumplimientoService>(ProgramaIncumplimientoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
