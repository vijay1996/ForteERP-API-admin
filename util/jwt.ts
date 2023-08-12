import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { getReadableError } from '../database/errorCodes.js';

dotenv.config()

const SECRET = process.env.ADMIN_SECRET as string;

export function createToken (_id: any) {
    return jwt.sign({_id}, SECRET, {expiresIn: '1d'})
}

export function verifToken (token: string, fetchedId: string) {
    if (!token) return getReadableError('tokenMissing');
    try {
        const decoded:any = jwt.verify(token, SECRET)
        if (fetchedId === decoded._id) {
            return {name:"success"};
        } else {
            return getReadableError('tokenInvalid');
        } 
    } catch (e) {
        return {name: "CustomError", message: e}
    }
}