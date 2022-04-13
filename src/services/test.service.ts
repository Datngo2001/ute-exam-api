import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { CreateUserDto, LoginDto, SignupDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { isEmpty } from '@utils/util';
import prisma from '@/dbclient';
import { Test, User } from '@prisma/client';
import { CreateTestDto } from '@/dtos/tests.dto';

class TestService {
    public tests = prisma.test;

    public async CreateTest(testData: CreateTestDto, userId: any): Promise<Test> {
        if (isEmpty(testData)) throw new HttpException(400, "Empty test data");

        const stringData = JSON.stringify(testData)

        const createTestData: Promise<Test> = this.tests.create({ data: { content: stringData, userId: userId } });

        return createTestData;
    }

    public async GetTest(testId: number): Promise<Test> {
        const testData: Promise<Test> = this.tests.findUnique({ where: { id: testId } });
        if (!testData) throw new HttpException(409, "No test");

        return testData;
    }

    public async GetTestList(userId: number): Promise<Test[]> {
        const testsData: Test[] = await this.tests.findMany({ where: { userId: userId } });
        return testsData;
    }

}

export default TestService;
