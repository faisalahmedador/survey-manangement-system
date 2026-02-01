import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Surveys} from "./surveys";
import {SurveyDto} from "./dto/survey.dto";
import {Repository} from "typeorm";
import {PaginationDto} from "../common/dto/pagination.dto";

@Injectable()
export class SurveysService {
    constructor(
        @InjectRepository(Surveys)
        private readonly surveyRepo: Repository<Surveys>) {
    }

    async create(survey: SurveyDto) {
        return await this.surveyRepo.save(survey);
    }

    async update(survey: SurveyDto, id: number) {
        const existing = await this.surveyRepo.findOne({
            where: { id },
            relations: { fields: { fieldOptions: true } },
        });

        if (!existing) return null;

        const merged = this.surveyRepo.merge(existing, survey);
        merged.id = id;

        return await this.surveyRepo.save(merged);
    }


    async findAll(paginationDto: PaginationDto) {
        const { pageIndex = 0, pageSize = 10 } = paginationDto;
        console.log(paginationDto)
        console.log(pageSize)
        console.log(pageIndex)
        const [surveys, total] = await this.surveyRepo.findAndCount({
            skip: pageIndex * pageSize,
            take: pageSize})
        return {
            data: {
                total,
                surveys
            }
        }
    }

    async findById(id: number) {
        return await this.surveyRepo.findOne({where: {id},   relations: ['fields'],})
    }
}
