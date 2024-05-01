import { Module } from '@nestjs/common';
import { AlergyService } from './alergy.service';
import { AlergyController } from './alergy.controller';

@Module({
  controllers: [AlergyController],
  providers: [AlergyService],
})
export class AlergyModule {}
