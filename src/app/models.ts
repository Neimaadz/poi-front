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

export class Poi {
    name!: string;
    imagePath!: string;
    comment!: string;
    lat!: number;
    lng!: number;
}