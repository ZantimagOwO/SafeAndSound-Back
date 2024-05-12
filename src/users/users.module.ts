import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Phone } from '../phone/entities/phone.entity';
import { BloodType } from '../blood_type/entities/blood_type.entity';
import { Diabetes } from '../diabetes/entities/diabetes.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Phone]),
    TypeOrmModule.forFeature([BloodType]),
    TypeOrmModule.forFeature([Diabetes]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
