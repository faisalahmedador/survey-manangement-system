import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {PaginationDto} from "../common/dto/pagination.dto";
import {Submissions} from "./submissions";

@Injectable()
export class SubmissionsService {
    constructor(@InjectRepository(Submissions) private submissionsRepository: Repository<Submissions>) {
    }

    async create(dto: any) {
        const submission = new Submissions()
        submission.user = {id: dto.userId} as any;
        submission.survey = {id: dto.surveyId} as any;
        submission.submissionAnswers = dto.submissionAnswers;
        return await this.submissionsRepository.save(submission)
    }

    async findAll(paginationDto: PaginationDto) {
        const { pageIndex = 0, pageSize = 10 } = paginationDto;
        const [submissions, total] = await this.submissionsRepository.findAndCount({
            skip: pageIndex * pageSize,
            take: pageSize,
            relations: ['submissionAnswers', 'user', 'survey']
        })

        return {
            data: {
                total,
                submissions
            }
        }
    }

    async findById(id: number) {
        return await this.submissionsRepository.findOne({where: {id}})
    }

    async update(submission: any, id: number) {
        const selectedSubmission = this.findById(id)
        if (!selectedSubmission) {
            return new Error('Submission not found')
        }
        return await this.submissionsRepository.update(id, submission)

    }
}
