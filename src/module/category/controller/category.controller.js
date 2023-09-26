import slugify from 'slugify';
import categoryModel from '../../../../DB/model/Category.model.js';
import { asyncHandler } from './../../../service/errorHandling.js';
import cloudinary from '../../../service/cloudinary.js';
import productModel from '../../../../DB/model/Product.model.js';
import subcategoryModel from './../../../../DB/model/Subcategory.model.js';

export const createCategory = asyncHandler(async (req, res, next) => {
    const name = req.body.name.toLowerCase();
    if (await categoryModel.findOne({ name, createdBy: req.owner._id })) {
        return next(new Error(`Duplicate category name`, { cause: 409 }));
    }
    const { public_id, secure_url } = await cloudinary.uploader.upload(req.file.path, { folder: `${process.env.APP_NAME}/category` });
    const category = await categoryModel.create({
        name, slug: slugify(name), image: { public_id, secure_url }, createdBy: req.owner._id, updatedBy: req.owner._id
    });
    return res.status(201).json({ message: 'success', category });
})

export const updateCategory = asyncHandler(async (req, res, next) => {

    const category = await categoryModel.findById(req.params.categoryId);
    if (!category) {
        return next(new Error(`invalid category id ${req.params.categoryId}`, { cause: 400 }));
    }
    const name = req.body.name?.toLowerCase();
    if (name) {
        if (category.name === name) {
            return next(new Error(`old name match new name`, { cause: 400 }));
        }
        if (await categoryModel.findOne({ name })) {
            return next(new Error(`Duplicate category name`, { cause: 400 }));
        }
        category.name = name;
        category.slug = slugify(name);
    }
    if (req.file) {
        const { public_id, secure_url } = await cloudinary.uploader.upload(req.file.path, { folder: `${process.env.APP_NAME}/category` });
        await cloudinary.uploader.destroy(category.image.public_id);
        category.image = { public_id, secure_url };
    }
    category.updatedBy = req.owner._id;
    await category.save();
    return res.status(201).json({ message: 'success', category });
})

export const getAllCategory = asyncHandler(async (req, res, next) => {
    const categories = await categoryModel.find({ createdBy: req.params.ownerId });
    return res.status(200).json({ message: 'success', categories });
})

export const categoryDetails = asyncHandler(async (req, res, next) => {
    const category = await categoryModel.findById(req.params.categoryId);
    return res.status(201).json({ message: 'success', category });
})

export const deleteCategory = asyncHandler(async (req, res, next) => {

    const { categoryId } = req.params;
    const category = await categoryModel.findById(categoryId);
    if (!category) {
        return next(new Error(`category not exists`, { cause: 400 }));
    }
    await productModel.deleteMany({ categoryId });
    await subcategoryModel.deleteMany({ categoryId });
    await categoryModel.deleteOne({ categoryId });
    return res.status(200).json({ message: 'success' });
})

export const getProducts = asyncHandler(async (req, res, next) => {

    const { categoryId } = req.params;
    const products = await categoryModel.find({ _id: categoryId }).select('products').populate({
        path: 'products',
        match: { isDeleted: { $eq: false } }
    })
    return res.status(201).json({ message: 'success', products });
})