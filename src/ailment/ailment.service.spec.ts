import { Test, TestingModule } from '@nestjs/testing';
import { AilmentService } from './ailment.service';

describe('AilmentService', () => {
  let service: AilmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AilmentService],
    }).compile();

    service = module.get<AilmentService>(AilmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
