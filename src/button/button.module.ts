import { Module } from '@nestjs/common';
import { ButtonService } from './button.service';
import { ButtonController } from './button.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Phone } from '../phone/entities/phone.entity';
import { Button } from './entities/button.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Phone]),
    TypeOrmModule.forFeature([Button])
  ],
  controllers: [ButtonController],
  providers: [ButtonService],
})
export class ButtonModule {}
