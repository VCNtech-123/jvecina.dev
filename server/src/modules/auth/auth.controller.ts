import { Request, Response } from 'express'
import { loginUserService, registerUserService } from './auth.service';
import { generateToken } from '../../utils/generateToken'
import { CookieOptions } from 'express';
import { LoginBody, RegisterBody } from './auth.validation'

export const register = async (req: Request, res: Response) => {

    const { body } = res.locals.validated as {
        body: RegisterBody
    };
    const { name, email, password } = body
    const user = await registerUserService(name, email, password);

    res.status(201).json({
        status: "success",
        data: {
            id: user._id,
            name: user.name,
            email: user.email,
        },
    });
};

export const loginUser = async (req: Request, res: Response) => {

    const { body } = res.locals.validated as {
        body: LoginBody
    };
    const { email, password } = body
    const admin = await loginUserService(email, password);
    const token = generateToken(admin._id.toString());

    const isProd = process.env.NODE_ENV === "production";

    const cookieOptions: CookieOptions = {
      httpOnly: true,
      secure: isProd,                    
      sameSite: isProd ? "none" : "lax", 
      path: "/",
      maxAge: 24 * 60 * 60 * 1000,
    };

    res.cookie("token", token, cookieOptions)

     res.status(200).json({
        status: "success",
        data: {
            id: admin._id,
            name: admin.name,
            email: admin.email,
        },
    });
}
