import {BadRequestException, Body, Controller, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import {SurveyDto} from "./dto/survey.dto";
import {SurveysService} from "./surveys.service";
import {Roles} from "../common/decorator/roles/roles.decorator";
import {JwtAuthGuard} from "../common/guards/jwt-auth/jwt-auth.guard";
import {RolesGuard} from "../auth/roles.guard";
import {Role} from "../common/enums/role/role";
import {PaginationDto} from "../common/dto/pagination.dto";

@Controller('surveys')
export class SurveysController {

    constructor(private readonly surveyService: SurveysService) {
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles([Role.ADMIN])
    @Post('create')
    async create(@Body() surveyDto: SurveyDto) {
        try {
            return await this.surveyService.create(surveyDto)
        }catch (e) {
            throw new BadRequestException('Bad request')
        }

    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles([Role.ADMIN])
    @Put('update/:id')
    async update(@Body() surveyDto: SurveyDto, @Param('id') id: string) {
        try {
            console.log(id)
            return await this.surveyService.update(surveyDto, Number(id))
        }catch (e) {
            console.log(e.message)
            throw new BadRequestException('Bad request')
        }

    }

    @UseGuards(JwtAuthGuard)
    @Post('list')
    async findAll(@Body() paginationDto: PaginationDto) {
        return await this.surveyService.findAll(paginationDto)
    }

    @UseGuards(JwtAuthGuard)
    @Get('get/:id')
    async findById(@Param('id') id: string) {
        return await this.surveyService.findById(Number(id))
    }
}
