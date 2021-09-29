/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ToTryResult, ToTryResultObject } from "./ToTryResult";

export async function toTryAsync<T>(fn: () => Promise<T>, handleErr: (e: any) => void = (e) => null): Promise<ToTryResult<T>>{
  
  const result:ToTryResult<T> = [null, null];
  
  try {
    result[0] = await fn();
  } catch (err) {
    result[1] = err;
    handleErr(err);
  }
  
  return result;
}

export async function toTryAsyncObject<T>(fn: () => Promise<T>, handleErr: (error: any) => void = error => null): Promise<ToTryResultObject<T>>{
  
  const result:ToTryResultObject<T> = {
    result: null,
    err: null
  };

  try {
    result.result = await fn();
  } catch (err) {
    result.err = err;
    handleErr(err);
  }

  return result;
}
