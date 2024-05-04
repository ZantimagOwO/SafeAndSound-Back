import { Module } from '@nestjs/common';
import { PhoneService } from './phone.service';
import { PhoneController } from './phone.controller';
import { Phone } from './entities/phone.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Phone])],
  controllers: [PhoneController],
  providers: [PhoneService],
})
export class PhoneModule {}
