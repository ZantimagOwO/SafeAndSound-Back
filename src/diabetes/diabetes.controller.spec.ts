import { Test, TestingModule } from '@nestjs/testing';
import { DiabetesController } from './diabetes.controller';
import { DiabetesService } from './diabetes.service';

describe('DiabetesController', () => {
  let controller: DiabetesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiabetesController],
      providers: [DiabetesService],
    }).compile();

    controller = module.get<DiabetesController>(DiabetesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
