import { Module } from '@nestjs/common';
import { SurveysController } from './surveys.controller';
import { SurveysService } from './surveys.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Surveys} from "./surveys";

@Module({
  controllers: [SurveysController],
  providers: [SurveysService],
    imports: [
        TypeOrmModule.forFeature([Surveys])
    ]
})
export class SurveysModule {}
