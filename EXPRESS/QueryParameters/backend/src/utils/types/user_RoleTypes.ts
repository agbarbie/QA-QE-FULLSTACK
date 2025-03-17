import {Request} from 'express';

export interface User_RoleTypes {
    role_id:number;
    role_name:string;
}

export interface RoleRequest extends Request {
    user?: {
        role_name: string;
    };
}