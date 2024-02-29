import prisma from '@/utils/lib/prisma';
import {
  E_MessageStatus,
  I_Pagination,
  I_UserBodyFields,
  I_UserBody,
  T_User,
  T_UserPublic,
  T_UserResponse
} from '@/types';
import { StatusCodes } from 'http-status-codes';
import {
  badRequestResponse,
  conflictResponse,
  createResponse,
  getPaginataionOptions,
  notFoundResponse,
  serverErrorResponse,
  successResponse
} from '@/utils';
import { E_Role } from '@prisma/client';
import { hash } from 'bcrypt';

class UserService {
  constructor() {}

  //get user by id
  public async getUserByUserId(id: string | number): Promise<T_UserResponse> {
    try {
      if (isNaN(Number(id))) {
        return badRequestResponse('Not valid user id');
      }

      const user: T_User | null = await prisma.user.findUnique({
        where: { id: Number(id) }
      });

      if (!user) {
        return notFoundResponse();
      }

      return successResponse(this.preparedPublicUser(user));
    } catch (error) {
      return serverErrorResponse(error);
    }
  }

  //get all users with pagination I_Pagination
  public async getUsers(req: Request): Promise<
    T_UserResponse<{
      pagination: I_Pagination;
      users: T_UserPublic[];
    }>
  > {
    try {
      const { searchParams } = new URL(req.url!);

      const count = await prisma.user.count();

      const pagination: I_Pagination = getPaginataionOptions({
        searchParams,
        count
      });

      if (!count) {
        return notFoundResponse();
      }

      const users = await prisma.user.findMany({
        where: {},
        take: pagination.skip,
        skip: (pagination.page - 1) * pagination.skip
      });

      const publicUser: T_UserPublic[] = users.map(user =>
        this.preparedPublicUser(user)
      );

      return successResponse({ pagination, users: publicUser });
    } catch (error) {
      return serverErrorResponse(error);
    }
  }

  //create new user
  public async createUser(
    req: Request,
    reqBody?: I_UserBody
  ): Promise<T_UserResponse> {
    try {
      const body = !!reqBody ? reqBody : await req.json();

      const { email, name, password, role }: I_UserBody = body;

      const isExistEmail = await this.checkIsUserWithEmailExist(email);
      console.log('isExistEmail==', isExistEmail);

      if (isExistEmail) {
        return conflictResponse(`User with email:${email} is already exist`);
      }

      const isExistName = await this.checkIsUserWithNameExist(name);
      console.log('isExistName==', isExistName);

      if (isExistName) {
        return conflictResponse(`User with name:${name} is already exist`);
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

      return createResponse(this.preparedPublicUser(createdUser));
    } catch (error) {
      return serverErrorResponse(error);
    }
  }

  // update user by user id
  public async updateUser({
    id,
    body
  }: {
    id: string | number;
    body: I_UserBodyFields;
  }): Promise<T_UserResponse> {
    try {
      if (isNaN(Number(id))) {
        return badRequestResponse('Not valid user id');
      }

      const currentUser = await this.getUserByUserId(id);

      if (currentUser.status !== StatusCodes.OK) {
        //if not found user return error response
        return currentUser;
      }

      const { email, name, password, role } = body;
      let newUserData = {};

      // Checking if the email is available
      if (!!email) {
        const existEmail = await this.checkIsUserWithEmailExist(email);

        if (existEmail) {
          return conflictResponse(`Email:${email} was already taken`);
        }

        newUserData = { ...newUserData, email };
      }

      // Checking if the name is available
      if (!!name) {
        const existName = await this.checkIsUserWithNameExist(name);

        if (existName) {
          return conflictResponse(`Name:${name} was already taken`);
        }

        newUserData = { ...newUserData, name };
      }

      if (!!password) {
        const hashedPassword = await hash(password.trim(), 10);

        newUserData = { ...newUserData, password: hashedPassword };
      }

      if (!!role) {
        newUserData = { ...newUserData, role };
      }

      const updatedUser = await prisma.user.update({
        where: { id: Number(id) },
        data: { ...newUserData }
      });

      return successResponse(this.preparedPublicUser(updatedUser));
    } catch (error) {
      return serverErrorResponse(error);
    }
  }

  //delete user by user id
  public async deleteUserByUserId(
    id: string | number
  ): Promise<T_UserResponse<T_User | T_UserPublic>> {
    try {
      const userResponse = await this.getUserByUserId(id);

      if (userResponse.status !== StatusCodes.OK) {
        return userResponse;
      }

      const deletedUser = await prisma.user.delete({
        where: { id: Number(id) }
      });

      return successResponse(deletedUser, E_MessageStatus.deleted);
    } catch (error) {
      return serverErrorResponse(error);
    }
  }

  //find user by email in db
  private async findUserByEmail(email: string): Promise<T_UserResponse> {
    try {
      const user: T_User | null = await prisma.user.findUnique({
        where: { email: email.toLowerCase() }
      });

      if (!user) {
        return notFoundResponse(`User with email:"${email}" is not found!`);
      }

      return successResponse(this.preparedPublicUser(user));
    } catch (error) {
      return serverErrorResponse(error);
    }
  }

  //find user by email in db
  private async findUserByName(name: string): Promise<T_UserResponse> {
    try {
      const user: T_User | null = await prisma.user.findUnique({
        where: { name: name.toLowerCase() }
      });

      if (!user) {
        return notFoundResponse(`User with name:"${name}" is not found!`);
      }

      return successResponse(this.preparedPublicUser(user));
    } catch (error) {
      return serverErrorResponse(error);
    }
  }

  //check is user with email already exist in db
  private async checkIsUserWithEmailExist(email: string): Promise<boolean> {
    const user = await (await this.findUserByEmail(email)).json();
    return !!user.data;
  }

  //check is user with name already exist in db
  private async checkIsUserWithNameExist(name: string): Promise<boolean> {
    const user = await (await this.findUserByName(name)).json();
    return !!user.data;
  }

  //prepare public user data whithout password
  private preparedPublicUser(user: T_User): T_UserPublic {
    // eslint-disable-next-line
    const { password: newHashedPassword, ...publicUserData } = user;

    return publicUserData;
  }
}

export const userService = new UserService();
