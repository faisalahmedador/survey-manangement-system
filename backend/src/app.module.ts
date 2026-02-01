import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { SurveysModule } from './surveys/surveys.module';
import { FieldsModule } from './fields/fields.module';
import { SubmissionsModule } from './submissions/submissions.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [
      ConfigModule.forRoot({
          isGlobal: true
      }),
      UserModule,
      SurveysModule,
      FieldsModule,
      SubmissionsModule,
      AuthModule,
      DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
