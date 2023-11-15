import { Test, TestingModule } from '@nestjs/testing';
import { GestionController } from './gestion.controller';
import { GestionService } from './gestion.service';

describe('GestionController', () => {
  let controller: GestionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GestionController],
      providers: [GestionService],
    }).compile();

    controller = module.get<GestionController>(GestionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
