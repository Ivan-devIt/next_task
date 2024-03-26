import { E_MessageStatus, I_ResponseMessage } from '@/types';
import { StatusCodes } from 'http-status-codes';
import { NextResponse } from 'next/server';

//get response message by default is status=200, message=success, data=null
export const responseMessage = <T>({
  data = null,
  message = E_MessageStatus.success,
  status = StatusCodes.OK
}: I_ResponseMessage<T>): NextResponse<I_ResponseMessage<T>> => {
  return NextResponse.json(
    {
      status,
      message,
      data
    },
    { status }
  );
};

//success response
export const successResponse = <T>(data: T, message?: string) =>
  responseMessage({ data, message });

//create response
export const createResponse = <T>(data: T, message?: string) =>
  responseMessage({
    data,
    message: message || E_MessageStatus.created,
    status: StatusCodes.CREATED
  });

//not found response
export const notFoundResponse = <T>(message?: string, data?: T) =>
  responseMessage({
    status: StatusCodes.NOT_FOUND,
    message: !!message ? message : E_MessageStatus.notFound,
    data
  });

//bad request response
export const badRequestResponse = <T>(message?: string, data?: T) =>
  responseMessage({
    status: StatusCodes.BAD_REQUEST,
    message: !!message ? message : E_MessageStatus.badRequest,
    data
  });

//conflict response
export const conflictResponse = <T>(message?: string, data?: T) =>
  responseMessage({
    status: StatusCodes.CONFLICT,
    message: !!message ? message : E_MessageStatus.connflict,
    data
  });

//server error response
export const forbiddenResponse = <T>(message?: string, data?: T) =>
  responseMessage({
    status: StatusCodes.FORBIDDEN,
    message: !!message ? message : E_MessageStatus.forbidden,
    data
  });

//server error response
/* eslint-disable */
export const serverErrorResponse = <T>(error: any, data?: T) =>
  responseMessage({
    status: !!error?.status ? error.status : StatusCodes.INTERNAL_SERVER_ERROR,
    message: !!error?.message ? error.message : E_MessageStatus.error,
    data
  });
