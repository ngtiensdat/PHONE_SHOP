export interface UserPayload {
    sub: number;
    email: string;
    role: string;
}
export declare const GetUser: (...dataOrPipes: unknown[]) => ParameterDecorator;
