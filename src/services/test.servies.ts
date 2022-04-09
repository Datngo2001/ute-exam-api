import { hash } from 'bcrypt';
import { CreateQuestionDto, CreateTestDto} from '@/dtos/test.dto';
import { CreateUserDto, UpdateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { Test } from '@prisma/client';
import { User } from '@prisma/client';
import { Question } from '@prisma/client';
import { isEmpty } from '@utils/util';
import prisma from '@/dbclient';
import { time } from 'console';

class TestService {
  public tests = prisma.test;
  public questions = prisma.question;
  public users = prisma.user;

  public async findTestbycode(testCode: string): Promise<Test> {
    const findTest: Test = await this.tests.findUnique({ where: { testcode: testCode } })
    if (!findTest) throw new HttpException(409, "Test Not Found");

    return findTest;
  }

  public async createTest(Username: string , userData: CreateTestDto): Promise<Test> {
    if (isEmpty(userData)) throw new HttpException(400, "Please fill all information");
    
    const testcode = Username + Date.now().toString;
    const name = await userData.name;
    
    const createUserData: Test = await this.tests.create({
      data: { name: userData.name, testcode: testcode, 
        question:{
          create:userData.questions
        } 
      } 
    });
    return createUserData;
  }

  public async createQuestion(testCode: string, userData: CreateQuestionDto): Promise<Question> {
    if (isEmpty(userData)) throw new HttpException(400, "Please fill all information");    

    const title = await userData.tittle;
    const hashedcorrecAnswer = await hash(userData.correctAnswer, 10);
    const testcode = testCode
    const answerlist = await userData.answerList;
        
    const createUserData: Question = await this.questions.create({ 
      data: {
        testcode: userData.testCode,
        title: userData.tittle,
        correctAnswer: userData.correctAnswer,
        answerList:{
          create: userData.answerList
        }
      }
    });

    return createUserData;
  }


}

export default TestService;
