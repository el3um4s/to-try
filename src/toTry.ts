/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ToTryResult, ToTryResultObject } from "./ToTryResult";

export function toTry<T>(fn: () => T, handleErr: (e: any) => void = (e) => null): ToTryResult<T> {
  
  const result:ToTryResult<T> = [null, null];
  
  try {
    result[0] = fn();
  } catch (err) {
    result[1] = err;
    handleErr(err);
  }

  return result;
}

export function toTryObject<T>(fn: () => T, handleErr: (error: any) => void = error => null): ToTryResultObject<T> {
  
  const result:ToTryResultObject<T> = {
    result: null,
    err: null
  };
  
  try {
    result.result = fn();
  } catch (err) {
    result.err = err;
    handleErr(err);
  }

  return result;
}
