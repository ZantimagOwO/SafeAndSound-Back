import { Module } from '@nestjs/common';
import { AilmentService } from './ailment.service';
import { AilmentController } from './ailment.controller';

@Module({
  controllers: [AilmentController],
  providers: [AilmentService],
})
export class AilmentModule {}
