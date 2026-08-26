import jwt, { SignOptions } from 'jsonwebtoken'
import { env } from '../config/env'

const expiresIn = (env.expiresIn) as SignOptions['expiresIn'];

export const generateToken = (userId: string) => {
    return jwt.sign(
        { id: userId },
        env.jwt as string,
        { expiresIn }
    )
}