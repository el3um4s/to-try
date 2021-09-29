/* eslint-disable @typescript-eslint/no-explicit-any */
export type ToTryResult<Type> = [
    Type | null,
    Error | any
]

export interface ToTryResultObject<Type> {
    result:Type | null;
    err: Error | any;
}