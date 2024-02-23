import prisma from '@/prisma/client';
import { E_MessageStatus, T_User } from '@/types';
import { NextResponse } from 'next/server';
import { StatusCodes } from 'http-status-codes';
import { getPaginataionOptions } from '@/utils/helpers';
import { E_Role } from '@prisma/client';
import { hash } from 'bcrypt';
import { userSchema } from '@/utils/validation';

interface I_Body {
  name: string;
  email: string;
  password: string;
}

export class UserService {
  constructor() {}

  //get all users with pagination
  async getUsers(req: Request) {
    try {
      const { searchParams } = new URL(req.url!);

      const count = await prisma.user.count();

      const pagination = await getPaginataionOptions({ searchParams, count });

      if (!count)
        return NextResponse.json(
          {
            status: StatusCodes.NOT_FOUND,
            pagination,
            data: []
          },
          { status: StatusCodes.NOT_FOUND }
        );

      const users = await prisma.user.findMany({
        where: {},
        take: pagination.skip,
        skip: (pagination.page - 1) * pagination.skip
      });

      return NextResponse.json({
        status: StatusCodes.OK,
        pagination,
        data: users
      });
    } catch (error: any) {
      return NextResponse.json(
        {
          status: StatusCodes.INTERNAL_SERVER_ERROR,
          message: !!error?.message ? error?.message : E_MessageStatus.error,
          data: null
        },
        { status: StatusCodes.INTERNAL_SERVER_ERROR }
      );
    }
  }

  //create new user
  async createUser(req: Request, reqBody?: I_Body) {
    try {
      console.log('createUser===============', reqBody);

      // const body = await req.json();

      const body = !!reqBody ? reqBody : await req.json();

      console.log('createUser=====body==========', body);

      const { email, name, password }: I_Body = body;

      const isExistEmail = await this.checkIsUserWithEmailExist(email);

      if (isExistEmail) {
        return NextResponse.json(
          {
            status: StatusCodes.CONFLICT,
            data: null,
            message: `User with email:${email} is already exist`
          },
          { status: StatusCodes.CONFLICT }
        );
      }

      const isExistName = await this.checkIsUserWithNameExist(name);

      if (isExistName) {
        return NextResponse.json(
          {
            status: StatusCodes.CONFLICT,
            data: null,
            message: `User with name:${name} is already exist`
          },
          { status: StatusCodes.CONFLICT }
        );
      }

      const hashedPassword = await hash(password, 10);

      const createdUser = await prisma.user.create({
        // TODO need coding password and think about role
        data: { email, name, password: hashedPassword, role: E_Role.CUSTOMER }
      });

      const { password: newHashedPassword, ...rest } = createdUser;

      return NextResponse.json(
        { status: 201, data: rest, message: E_MessageStatus.created },
        { status: StatusCodes.CREATED }
      );
    } catch (error: any) {
      // console.log('====error====', JSON.stringify(error, null, 2));

      return NextResponse.json(
        {
          status: StatusCodes.INTERNAL_SERVER_ERROR,
          message: !!error?.message
            ? String(error?.message)
            : E_MessageStatus.error,
          data: null
        },
        { status: StatusCodes.INTERNAL_SERVER_ERROR }
      );
    }
  }

  //find user by email in db
  async findUserByEmail(email: string): Promise<
    NextResponse<{
      status: number;
      message: string;
      data: null | T_User;
    }>
  > {
    try {
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        return NextResponse.json({
          status: StatusCodes.NOT_FOUND,
          message: `User with email:"${email}" is not found!`,
          data: null
        });
      }

      return NextResponse.json({
        status: StatusCodes.OK,
        message: E_MessageStatus.success,
        data: user
      });
    } catch (error: any) {
      return NextResponse.json(
        {
          status: StatusCodes.INTERNAL_SERVER_ERROR,
          message: !!error?.message ? error?.message : E_MessageStatus.error,
          data: null
        },
        { status: StatusCodes.INTERNAL_SERVER_ERROR }
      );
    }
  }

  //find user by email in db
  async findUserByName(name: string): Promise<
    NextResponse<{
      status: number;
      message: string;
      data: null | T_User;
    }>
  > {
    try {
      const user = await prisma.user.findUnique({ where: { name } });

      if (!user) {
        return NextResponse.json({
          status: StatusCodes.NOT_FOUND,
          message: `User with name:"${name}" is not found!`,
          data: null
        });
      }

      return NextResponse.json({
        status: StatusCodes.OK,
        message: E_MessageStatus.success,
        data: user
      });
    } catch (error: any) {
      return NextResponse.json(
        {
          status: StatusCodes.INTERNAL_SERVER_ERROR,
          message: !!error?.message ? error?.message : E_MessageStatus.error,
          data: null
        },
        { status: StatusCodes.INTERNAL_SERVER_ERROR }
      );
    }
  }

  //check is user with email already exist in db
  async checkIsUserWithEmailExist(email: string): Promise<boolean> {
    return !!(await (await this.findUserByEmail(email)).json()).data;
  }

  //check is user with name already exist in db
  async checkIsUserWithNameExist(name: string): Promise<boolean> {
    return !!(await (await this.findUserByName(name)).json()).data;
  }
}
