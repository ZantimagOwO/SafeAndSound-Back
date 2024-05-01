import { Test, TestingModule } from '@nestjs/testing';
import { AlergyController } from './alergy.controller';
import { AlergyService } from './alergy.service';

describe('AlergyController', () => {
  let controller: AlergyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlergyController],
      providers: [AlergyService],
    }).compile();

    controller = module.get<AlergyController>(AlergyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
