import { Controller, Param, Body, Get, Post, Put, Delete,Req, HttpCode, UseBefore } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { CreateQuestionDto, CreateTestDto } from '@/dtos/test.dto';
import { RequestWithUser } from '@interfaces/auth.interface';
import { Test, User } from '@prisma/client';
import testService from '@services/test.servies';
import { validationMiddleware } from '@middlewares/validation.middleware';
import authMiddleware from '@/middlewares/auth.middleware';
import policyList from '@/policies';
import userService from '@/services/users.service';

@Controller('/api')
export class TestsController {
  public testService = new testService();
  public userService = new userService();

  @Get('/tests/:testcode')
  @UseBefore(authMiddleware(policyList.adminPolicy))
  @OpenAPI({ summary: 'Return find a test' })
  async findTestbycode(@Param('testcode') testCode: string) {
    const findOneUserData: Test = await this.testService.findTestbycode(testCode);
    return { data: findOneUserData, message: 'findOne' };
  }

  @Post('/:users/tests')
  @HttpCode(201)
  @UseBefore(authMiddleware(policyList.adminPolicy))
  @UseBefore(validationMiddleware(CreateTestDto, 'body'))
  @OpenAPI({ summary: 'Create a new test' })
  async createTest(@Req() req: RequestWithUser, @Body() userData: CreateTestDto) {
    const user: User = req.user;
    const createUserData: Test = await this.testService.createTest( user.username,userData);
    return { data: createUserData, message: 'created' };
  }

}
