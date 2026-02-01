export class CreateSubmissionAnswerDto {
    fieldId: number;
    answer: string;
}

export class CreateSubmissionDto {
    userId: number;
    surveyId: number;
    submissionAnswers: CreateSubmissionAnswerDto[];
}