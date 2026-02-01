import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import {RolesGuard} from "../auth/roles.guard";
import {Roles} from "../common/decorator/roles/roles.decorator";
import {Role} from "../common/enums/role/role";
import {JwtAuthGuard} from "../common/guards/jwt-auth/jwt-auth.guard";
import {SubmissionsService} from "./submissions.service";
import {PaginationDto} from "../common/dto/pagination.dto";

@Controller('submissions')
export class SubmissionsController {

    constructor(private readonly submissionService: SubmissionsService) {
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles([Role.OFFICER])
    @Post('create')
    async create(@Body() submissionDto: any) {
        return await this.submissionService.create(submissionDto)
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles([Role.OFFICER])
    @Post('update/:id')
    async update(@Body() submissionDto: any, id: number) {
        return await this.submissionService.update(submissionDto, id)
    }

    @UseGuards(JwtAuthGuard)
    @Post('list')
    async findAll(@Body() paginationDto: PaginationDto) {
        return await this.submissionService.findAll(paginationDto)
    }

    @UseGuards(JwtAuthGuard)
    @Post('findById')
    async findById(id: number) {
        return await this.submissionService.findById(id)
    }
}
