import { Test, TestingModule } from '@nestjs/testing';
import { ProgramaCumplimientoService } from './programa-cumplimiento.service';

describe('ProgramaCumplimientoService', () => {
  let service: ProgramaCumplimientoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProgramaCumplimientoService],
    }).compile();

    service = module.get<ProgramaCumplimientoService>(ProgramaCumplimientoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
