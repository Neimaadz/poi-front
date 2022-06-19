export class User {
    id: number
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
    id!: number;
    userId!: number;
    name!: string;
    imagePath!: string;
    comment!: string;
    lat!: string;
    lng!: string;
}