import { Exception } from '../exception';

export interface LoginResponse extends Exception {
    accessToken: string;
}

export interface RegisterResponse extends Exception {
    uuid: string;
    firstName: string;
    lastName: string;
    country: string;
    city: string;
    username: string;
    email: string;
    password: string;
}
