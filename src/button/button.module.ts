import { Module } from '@nestjs/common';
import { ButtonService } from './button.service';
import { ButtonController } from './button.controller';

@Module({
  controllers: [ButtonController],
  providers: [ButtonService],
})
export class ButtonModule {}
