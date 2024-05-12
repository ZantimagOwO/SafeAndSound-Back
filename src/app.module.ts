import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { BloodTypeModule } from './blood_type/blood_type.module';
import { CallModule } from './call/call.module';
import { ButtonModule } from './button/button.module';
import { AlergyModule } from './alergy/alergy.module';
import { AilmentModule } from './ailment/ailment.module';
import { PhoneModule } from './phone/phone.module';
import { DiabetesModule } from './diabetes/diabetes.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'database-2.cluu8caw4mbk.us-east-1.rds.amazonaws.com',
      port: 5432,
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      synchronize: true,
      username: 'postgres',
      password: '12341234',
      database: 'SafeAndSound',
    }),
    BloodTypeModule,
    CallModule,
    ButtonModule,
    AlergyModule,
    AilmentModule,
    PhoneModule,
    DiabetesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
