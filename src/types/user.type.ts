import { E_Role, User } from '@prisma/client';
import { I_ResponseMessage } from '.';
import { NextResponse } from 'next/server';

export type T_User = User;

export type T_UserPublic = {
  id: number;
  name: string;
  email: string;
  role: E_Role;
  created_at: Date;
  updated_at: Date;
};

export interface I_UserBody {
  name: string;
  email: string;
  password: string;
  role?: E_Role;
}

export interface I_UpdateUserBody {
  name?: string;
  email?: string;
  password?: string;
  role?: E_Role;
}

export type T_UserResponse<T = T_UserPublic> = NextResponse<
  I_ResponseMessage<T | null>
>;
