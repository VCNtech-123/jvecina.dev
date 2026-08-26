import { IAdmin } from "../modules/admin/admin.model";

declare global {
    namespace Express {
        interface Request {
            user?: IAdmin;
        }
    }
}