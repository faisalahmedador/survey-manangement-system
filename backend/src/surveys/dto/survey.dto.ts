import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class SurveyDto {

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;
}