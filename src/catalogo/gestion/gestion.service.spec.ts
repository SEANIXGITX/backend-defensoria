import { Test, TestingModule } from '@nestjs/testing';
import { GestionService } from './gestion.service';

describe('GestionService', () => {
  let service: GestionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GestionService],
    }).compile();

    service = module.get<GestionService>(GestionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
