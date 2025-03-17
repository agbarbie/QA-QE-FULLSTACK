import {Request} from 'express';
export interface users{
    user_id: number;
    name:string;
    email:string;
    password?:string;
    role_id:number;
}
/**
 * Custom Express Request Type to include `user` object
 */
export interface UserRequest extends Request {
    user?: users;
}
