import { Response } from 'express';
import { Controller, Req, Body, Post, UseBefore, HttpCode, Res, Get, Param } from 'routing-controllers';
import { CreateUserDto, LoginDto, SignupDto } from '@dtos/users.dto';
import { RequestWithUser } from '@interfaces/auth.interface';
import authMiddleware from '@middlewares/auth.middleware';
import { validationMiddleware } from '@middlewares/validation.middleware';
import AuthService from '@services/auth.service';
import { Test, User } from '@prisma/client';
import policyList from '@/policies';
import TestService from '@/services/test.service';
import { OpenAPI } from 'routing-controllers-openapi';
import { CreateTestDto } from '@/dtos/tests.dto';

@Controller('/api')
export class TestController {
    public testService = new TestService();

    @Get('/tests')
    @UseBefore(authMiddleware(policyList.teacherPolicy))
    @OpenAPI({ summary: 'Return a list of tests for teacher' })
    async getTests(@Req() req: RequestWithUser) {
        const testList: Test[] = await this.testService.GetTestList(req.user.id);
        return { data: testList, message: 'list' };
    }

    @Get('/tests/:id')
    @OpenAPI({ summary: 'Return test for student' })
    async getTestById(@Param('id') testId: number) {
        const test: Test = await this.testService.GetTest(testId);
        return { data: test, message: 'test' };
    }

    @Post('/tests')
    @UseBefore(validationMiddleware(CreateTestDto, 'body'))
    @UseBefore(authMiddleware(policyList.teacherPolicy))
    @HttpCode(201)
    async create(@Req() req: RequestWithUser, @Body() testData: CreateTestDto) {
        const createTestData: Test = await this.testService.CreateTest(testData, req.user.id);
        return { id: createTestData.id, message: 'create' };
    }
}
