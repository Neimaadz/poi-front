export class User {
    username!: string;
    password!: string;
    token!: string;
}
// 
export interface TokenUserPayload {
    token: string;
    user: User;
}