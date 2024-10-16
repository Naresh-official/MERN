import { IUser } from "../../models/user.model.js";
declare global {
    namespace Express {
        export interface Request {
            user?: IUser | null;
        }
    }
}
