import { StatusCodes } from 'http-status-codes';
import { E_MessageStatus } from '.';

export interface I_ResponseMessage<T> {
  data?: T | null;
  message?: string;
  status?: StatusCodes;
}
