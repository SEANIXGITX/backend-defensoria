import { Test, TestingModule } from '@nestjs/testing';
import { EstadoCotizacionService } from './estado-cotizacion.service';

describe('EstadoCotizacionService', () => {
  let service: EstadoCotizacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EstadoCotizacionService],
    }).compile();

    service = module.get<EstadoCotizacionService>(EstadoCotizacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
