import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:[`.env.stage.${process.env.Stage}`],
    }),
    TasksModule,
    TypeOrmModule.forRootAsync(typeOrmConfig),
    AuthModule,
  ],
})
export class AppModule {}
