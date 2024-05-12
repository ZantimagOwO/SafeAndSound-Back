import { Module } from '@nestjs/common';
import { DiabetesService } from './diabetes.service';
import { DiabetesController } from './diabetes.controller';

@Module({
  controllers: [DiabetesController],
  providers: [DiabetesService],
})
export class DiabetesModule {}
