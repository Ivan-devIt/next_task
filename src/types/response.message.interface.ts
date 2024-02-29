import { StatusCodes } from 'http-status-codes';

export interface I_ResponseMessage<T> {
  data?: T | null;
  message?: string;
  status?: StatusCodes;
}
