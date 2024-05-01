import { Module } from '@nestjs/common';
import { BloodTypeService } from './blood_type.service';
import { BloodTypeController } from './blood_type.controller';

@Module({
  controllers: [BloodTypeController],
  providers: [BloodTypeService],
})
export class BloodTypeModule {}
