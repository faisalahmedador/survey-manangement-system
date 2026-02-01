import { Module } from '@nestjs/common';
import { SubmissionsController } from './submissions.controller';
import { SubmissionsService } from './submissions.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {SubmissionAnswer} from "./submissionAnswer";
import {Submissions} from "./submissions";

@Module({
  controllers: [SubmissionsController],
  providers: [SubmissionsService],
    imports: [
        TypeOrmModule.forFeature([Submissions, SubmissionAnswer])
    ]
})
export class SubmissionsModule {}
