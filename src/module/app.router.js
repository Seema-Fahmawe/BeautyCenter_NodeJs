import connectDB from "../../DB/connection.js";
import { globalErrorHandler } from "../service/errorHandling.js";
import authRouter from './auth/auth.router.js';
import userRouter from './user/user.router.js';
import categoryRouter from './category/category.router.js';
import subcategoryRouter from './subcategory/subcategory.router.js';
import ownerRouter from './owner/owner.router.js';
import couponRouter from './coupon/coupon.router.js';
import productRouter from './product/product.router.js';
import reservationRouter from './reservation/reservation.router.js';
import reviewRouter from './review/review.router.js';
import postRouter from './post/post.router.js';
import commentRouter from './comment/comment.router.js';
import wishlistRouter from './wishlist/wishlist.router.js';

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
    app.use('/subcategory', subcategoryRouter);
    app.use('/coupon', couponRouter);
    app.use('/product', productRouter);
    app.use('/reservation', reservationRouter);
    app.use('/review', reviewRouter);
    app.use('/post', postRouter);
    app.use('/comment', commentRouter);
    app.use('/wishlist', wishlistRouter);
    app.use('*', (req, res) => {
        return res.json({ message: 'page not found' });
    })
    app.use(globalErrorHandler);
}
export default initApp;