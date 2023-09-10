import productModel from '../../../../DB/model/Product.model.js';
import { asyncHandler } from './../../../service/errorHandling.js';
import cloudinary from './../../../service/cloudinary.js';
import slugify from 'slugify';
import subcategoryModel from './../../../../DB/model/Subcategory.model.js';

export const createProduct = asyncHandler(async (req, res, next) => {

    let { name, price, description, discount, stock, categoryId, subcategoryId, finalPrice } = req.body;
    const checkCategory = await subcategoryModel.findOne({ _id: subcategoryId, categoryId });
    if (!checkCategory) {
        return next(new Error('invalid category or sub category', { cause: 400 }));
    }
    name = req.body.name.toLowerCase();
    if (await productModel.findOne({ name })) {
        return next(new Error(`Duplicate product name`, { cause: 409 }));
    }

    finalPrice = price - (price * ((discount || 0) / 100));
    const { public_id, secure_url } = await cloudinary.uploader.upload(req.files.mainImage[0].path, { folder: `${process.env.APP_NAME}/product/mainImage` });
    const subImages = [];
    if (req.files.subImages) {
        for (const file of req.files.subImages) {
            const { public_id, secure_url } = await cloudinary.uploader.upload(file.path, { folder: `${process.env.APP_NAME}/product/subImages` });
            subImages.push({ public_id, secure_url });
        }
    }
    const product = await productModel.create({
        name, price, description, slug: slugify(name), mainImage: { public_id, secure_url }, subImages: subImages,
        createdBy: req.owner._id, updatedBy: req.owner._id, stock, categoryId, subcategoryId, finalPrice, discount
    });
    return res.status(201).json({ message: 'success', product });
})