import connectDB from "../../DB/connection.js";
import { globalErrorHandler } from "../service/errorHandling.js";
import authRouter from './auth/auth.router.js';
import userRouter from './user/user.router.js';
import categoryRouter from './category/category.router.js';
import ownerRouter from './owner/owner.router.js';
import cors from 'cors';

const initApp = (app, express) => {
    app.use(async (req, res, next) => {
        //  var whitelist = ['http://example1.com', 'http://example2.com']
        //  if (!whitelist.includes(req.header('origin'))) {
        //  return next(new Error('invalid origin', { cause: 403 }));
        //  }
        next();
    })
    app.use(cors());
    connectDB();
    app.use(express.json());
    app.use('/auth', authRouter);
    app.use('/user', userRouter);
    app.use('/category', categoryRouter);
    app.use('/owner', ownerRouter);
    app.use('*', (req, res) => {
        return res.json({ message: 'page not found' });
    })
    app.use(globalErrorHandler);
}
export default initApp;