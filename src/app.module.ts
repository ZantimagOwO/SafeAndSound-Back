import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
