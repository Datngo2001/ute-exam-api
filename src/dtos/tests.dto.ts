import { IsArray, IsNumber, IsString } from "class-validator"

export class QuestionDto {
    @IsString()
    title: String
    @IsArray()
    option: String[]
    @IsNumber()
    answer: number
}

export class CreateTestDto {
    @IsString()
    title: String
    @IsArray()
    questions: QuestionDto[]
}


