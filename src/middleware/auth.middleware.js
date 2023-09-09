import ownerModel from "./../../DB/model/Owner.model.js";
import { asyncHandler } from "../service/errorHandling.js";
import { verifyToken } from "../service/generateAndVerifyToken.js";
import userModel from './../../DB/model/User.model.js';

export const roles = {
    User: 'User',
    Admin:'Admin',
    Owner: 'Owner',
}

export const auth = (accessRoles = []) => {
    return asyncHandler(async (req, res, next) => {
        const { authorization } = req.headers;
        if (!authorization?.startsWith(process.env.BEARER_KEY)) {
            return next(new Error("invalid bearer key", { cause: 400 }));
        }
        const token = authorization.split(process.env.BEARER_KEY)[1];
        if (!token) {
            return next(new Error("invalid token", { cause: 400 }));
        }
        const decoded = verifyToken(token, process.env.SIGNATURE_SIGNIN);
        if (!decoded) {
            return next(new Error("invalid token payload", { cause: 400 }));
        }
        const user = await userModel.findById(decoded.id);
        const owner = await ownerModel.findById(decoded.id);
        if (!user && !owner) {
            return next(new Error("not register user", { cause: 401 }));
        }
        if (!accessRoles.includes(user?.role) && !accessRoles.includes(owner?.role)) {
            return next(new Error("not authorized user", { cause: 403 }));
        }
        if (parseInt(user?.changePasswordTime?.getTime() / 1000) > decoded.iat
            && parseInt(owner?.changePasswordTime?.getTime() / 1000) > decoded.iat) {
            return next(new Error('expired token', { cause: 400 }));
        }
        req.user = user;
        req.owner = owner;
        return next();
    })
}


