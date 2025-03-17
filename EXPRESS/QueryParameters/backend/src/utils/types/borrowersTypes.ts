import {Request} from 'express';
export interface borrowerRequest extends Request{
    borrower_id:number;
    user_id:number;
    book_id:number;
    librarian_id:number;
    return_date:number;
    status:string;
    created_at:Date;
}