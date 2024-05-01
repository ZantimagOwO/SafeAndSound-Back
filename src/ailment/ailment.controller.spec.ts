import { Test, TestingModule } from '@nestjs/testing';
import { AilmentController } from './ailment.controller';
import { AilmentService } from './ailment.service';

describe('AilmentController', () => {
  let controller: AilmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AilmentController],
      providers: [AilmentService],
    }).compile();

    controller = module.get<AilmentController>(AilmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
