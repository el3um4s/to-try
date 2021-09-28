export type ToTryResult<Type> = [
    Type | null,
    Error | any
]

export interface ToTryResultObject<Type> {
    result:Type | null;
    err: Error | any;
}