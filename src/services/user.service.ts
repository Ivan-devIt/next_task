import prisma from '@/utils/lib/prisma';
import { E_MessageStatus, I_ResponseMessage, T_User } from '@/types';
import { NextResponse } from 'next/server';
import { StatusCodes } from 'http-status-codes';
import { getPaginataionOptions, responseMessage } from '@/utils';
import { E_Role } from '@prisma/client';
import { hash } from 'bcrypt';

interface I_Body {
  name: string;
  email: string;
  password: string;
  role?: E_Role;
}

// type CustomResponsePromise<T> = Promise<NextResponse<I_ResponseMessage<T>>>; //TODO

class UserService {
  constructor() {}

  //get user by id
  public async getUserByUserId(
    id: string | number
  ): Promise<NextResponse<I_ResponseMessage<T_User | null>>> {
    try {
      if (isNaN(Number(id))) {
        //if not valid user id
        return responseMessage({
          status: StatusCodes.BAD_REQUEST,
          message: 'Not valid user id'
        });
      }

      const user: T_User | null = await prisma.user.findUnique({
        where: { id: Number(id) }
      });

      if (!user) {
        return await this.notFoundUserResponse(id);
      }

      return responseMessage({ data: user });
    } catch (error: any) {
      return responseMessage({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: !!error?.message ? error?.message : E_MessageStatus.error
      });
    }
  }

  //get all users with pagination
  public async getUsers(req: Request) {
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
  public async createUser(req: Request, reqBody?: I_Body) {
    try {
      const body = !!reqBody ? reqBody : await req.json();

      const { email, name, password, role }: I_Body = body;

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

      const hashedPassword = await hash(password.trim(), 10);

      const createdUser = await prisma.user.create({
        // TODO  think about role
        data: {
          email: email.toLowerCase().trim(),
          name: name.toLowerCase().trim(),
          password: hashedPassword,
          role: !!role ? role : E_Role.CUSTOMER
        }
      });

      // eslint-disable-next-line
      const { password: newHashedPassword, ...rest } = createdUser;

      return NextResponse.json(
        { status: 201, data: rest, message: E_MessageStatus.created },
        { status: StatusCodes.CREATED }
      );
    } catch (error: any) {
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

  //delete user by user id
  public async deleteUserByUserId(
    id: string | number
  ): Promise<NextResponse<I_ResponseMessage<T_User | null>>> {
    try {
      const userResponse = await this.getUserByUserId(id);

      if (userResponse.status !== StatusCodes.OK) {
        return userResponse;
      }

      const deletedUser = await prisma.user.delete({
        where: { id: Number(id) }
      });

      return responseMessage({
        status: StatusCodes.OK,
        data: deletedUser
      });
    } catch (error: any) {
      return responseMessage({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: !!error?.message ? error?.message : E_MessageStatus.error
      });
    }
  }

  //find user by email in db
  private async findUserByEmail(
    email: string
  ): Promise<NextResponse<I_ResponseMessage<T_User | null>>> {
    try {
      const user: T_User | null = await prisma.user.findUnique({
        where: { email }
      });

      if (!user) {
        return responseMessage({
          status: StatusCodes.NOT_FOUND,
          message: `User with email:"${email}" is not found!`
        });
      }

      return responseMessage({ data: user });
    } catch (error: any) {
      return responseMessage({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: !!error?.message ? error?.message : E_MessageStatus.error
      });
    }
  }

  //find user by email in db
  private async findUserByName(
    name: string
  ): Promise<NextResponse<I_ResponseMessage<T_User | null>>> {
    try {
      const user: T_User | null = await prisma.user.findUnique({
        where: { name }
      });

      if (!user) {
        return responseMessage({
          status: StatusCodes.NOT_FOUND,
          message: `User with name:"${name}" is not found!`
        });
      }

      return responseMessage({ data: user });
    } catch (error: any) {
      return responseMessage({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: !!error?.message ? error?.message : E_MessageStatus.error
      });
    }
  }

  //check is user with email already exist in db
  private async checkIsUserWithEmailExist(email: string): Promise<boolean> {
    return !!(await (await this.findUserByEmail(email)).json()).data;
  }

  //check is user with name already exist in db
  private async checkIsUserWithNameExist(name: string): Promise<boolean> {
    return !!(await (await this.findUserByName(name)).json()).data;
  }

  //not found user response
  private async notFoundUserResponse(
    id: string | number
  ): Promise<NextResponse<I_ResponseMessage<null>>> {
    return responseMessage({
      status: StatusCodes.NOT_FOUND,
      message: `User with id:${id} is not found!`
    });
  }
}

export const userService = new UserService();
