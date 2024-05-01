import { Test, TestingModule } from '@nestjs/testing';
import { AlergyService } from './alergy.service';

describe('AlergyService', () => {
  let service: AlergyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlergyService],
    }).compile();

    service = module.get<AlergyService>(AlergyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
