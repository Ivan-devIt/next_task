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
