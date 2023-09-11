import productModel from '../../../../DB/model/Product.model.js';
import { asyncHandler } from './../../../service/errorHandling.js';
import cloudinary from './../../../service/cloudinary.js';
import slugify from 'slugify';
import subcategoryModel from './../../../../DB/model/Subcategory.model.js';

export const createProduct = asyncHandler(async (req, res, next) => {

    let { name, price, description, discount, categoryId, subcategoryId, finalPrice } = req.body;
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
    if (req.files?.subImages) {
        for (const file of req.files.subImages) {
            const { public_id, secure_url } = await cloudinary.uploader.upload(file.path, { folder: `${process.env.APP_NAME}/product/subImages` });
            subImages.push({ public_id, secure_url });
        }
    }
    const product = await productModel.create({
        name, price, description, slug: slugify(name), mainImage: { public_id, secure_url }, subImages: subImages,
        createdBy: req.owner._id, updatedBy: req.owner._id, categoryId, subcategoryId, finalPrice, discount
    });
    return res.status(201).json({ message: 'success', product });
})

export const updateProduct = asyncHandler(async (req, res, next) => {

    const product = await productModel.findById(req.params.productId);
    if (!product) {
        return next(new Error(`invalid product id ${req.params.productId}`, { cause: 400 }));
    }

    let { name, price, description, discount, categoryId, subcategoryId, finalPrice } = req.body;
    if (categoryId && subcategoryId) {
        const checkCategory = await subcategoryModel.findOne({ _id: subcategoryId, categoryId });
        if (!checkCategory) {
            return next(new Error('category id or sub category id not found', { cause: 400 }));
        } else {
            product.categoryId = categoryId;
            product.subcategoryId = subcategoryId;
        }
    } else if (subcategoryId) {
        const checkSubcategory = await subcategoryModel.findOne({ _id: subcategoryId });
        if (!checkSubcategory) {
            return next(new Error('sub category id not found', { cause: 400 }));
        } else {
            product.subcategoryId = subcategoryId;
        }
    }

    if (name?.toLowerCase()) {
        if (product.name === name) {
            return next(new Error(`old name match new name`, { cause: 400 }));
        }
        if (await productModel.findOne({ name })) {
            return next(new Error(`Duplicate product name`, { cause: 400 }));
        }
        product.name = name;
        product.slug = slugify(name);
    }

    if (description) {
        product.description = description;
    }

    if (price && discount) {
        product.discount = discount;
        product.price = price;
        product.finalPrice = price - (price * ((discount || 0) / 100));
    } else if (price) {
        product.price = price;
        product.finalPrice = price - (price * ((product.discount || 0) / 100));
    } else if (discount) {
        product.discount = discount;
        product.finalPrice = product.price - (product.price * ((discount || 0) / 100));
    }

    if (req.files?.mainImage) {
        const { public_id, secure_url } = await cloudinary.uploader.upload(req.files.mainImage[0].path, { folder: `${process.env.APP_NAME}/product/mainImage` });
        await cloudinary.uploader.destroy(product.mainImage.public_id);
        product.mainImage = { public_id, secure_url };
    }

    if (req.files?.subImages) {
        const subImages = [];
        for (const file of req.files.subImages) {
            const { public_id, secure_url } = await cloudinary.uploader.upload(file.path, { folder: `${process.env.APP_NAME}/product/subImages` });
            subImages.push({ public_id, secure_url });
        }
        product.subImages = subImages;
    }
    product.updatedBy = req.owner._id;
    await product.save();
    return res.status(201).json({ message: 'success', product });
})