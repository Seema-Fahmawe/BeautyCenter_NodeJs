import { asyncHandler } from './../../../service/errorHandling.js';
import productModel from './../../../../DB/model/Product.model.js';
import wishlistModel from '../../../../DB/model/Wishlist.model.js';

export const createWishlist = asyncHandler(async (req, res, next) => {

    const { productId } = req.body;
    if (!await productModel.findById(productId)) {
        return next(new Error('product is not found', { cause: 400 }));
    }
    const wishlist = await wishlistModel.findOne({ userId: req.user._id });
    if (!wishlist) {
        const newWishlist = await wishlistModel.create({
            userId: req.user._id,
            products: [{ productId }]
        })
        return res.status(201).json({ message: 'success', newWishlist });
    }
    let matchProduct = false;
    for (let i = 0; i < wishlist.products.length; i++) {
        if (wishlist.products[i].productId.toString() === productId) {
            matchProduct = true;
            return next(new Error('product already exists', { cause: 400 }));
        }
    }
    if (!matchProduct) {
        wishlist.products.push({ productId });
    }
    await wishlist.save();
    return res.status(201).json({ message: 'success' });
})

export const deleteItem = asyncHandler(async (req, res, next) => {

    const { productIds } = req.body;
    const deleteItem = await wishlistModel.updateOne({ userId: req.user._id }, {
        $pull: {
            products: {
                productId: { $in: productIds }
            }
        }
    })
    return res.status(200).json({ message: 'success' });
})

export const clearWishlist = asyncHandler(async (req, res, next) => {

    await wishlistModel.updateOne({ userId: req.user._id }, {
        products: [],
    })
    return res.status(200).json({ message: 'success' });
})

export const getWishlist = asyncHandler(async (req, res, next) => {

    const wishlist = await wishlistModel.findOne({ userId: req.user._id });
    return res.status(200).json({ message: 'success', wishlist });
})