import { IsString, IsArray } from 'class-validator';
import { Type } from 'class-transformer';


export class CreateQuestionDto{
  @IsString()
  public testCode: string;
  @IsString()
  public tittle: string;
  @IsString()
  public correctAnswer: string;
  @IsArray()
  public answerList: CreateAnswerDto[];
}

export class CreateAnswerDto{
  @IsString()
  public answer: string;
  @IsString()
  public question: string;
}

export class CreateTestDto{
  @IsString()
  public name: string;
  @IsArray()
  public questions: CreateQuestionDto[]
}
