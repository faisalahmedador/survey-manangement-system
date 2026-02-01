import { IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
    @IsOptional()
    @IsPositive()
    pageSize?: number;

    @IsOptional()
    @Min(0)
    pageIndex?: number;
}