import slugify from 'slugify';
import subcategoryModel from '../../../../DB/model/Subcategory.model.js';
import cloudinary from '../../../service/cloudinary.js';
import { asyncHandler } from './../../../service/errorHandling.js';
import productModel from '../../../../DB/model/Product.model.js';
import categoryModel from './../../../../DB/model/Category.model.js';

export const createSubcategory = asyncHandler(async (req, res, next) => {
    const name = req.body.name.toLowerCase();
    if (!await categoryModel.findOne({ categoryId: req.params.categoryId, createdBy: req.owner._id })) {
        return next(new Error(`invalid category id`, { cause: 409 }));
    }
    if (await subcategoryModel.findOne({ name, createdBy: req.owner._id })) {
        return next(new Error(`Duplicate subcategory name`, { cause: 409 }));
    }
    const { public_id, secure_url } = await cloudinary.uploader.upload(req.file.path, { folder: `${process.env.APP_NAME}/subcategory` });
    const subcategory = await subcategoryModel.create({
        name, slug: slugify(name), categoryId: req.params.categoryId, image: { public_id, secure_url }, createdBy: req.owner._id, updatedBy: req.owner._id
    });
    return res.status(201).json({ message: 'success', subcategory });
})

export const updateSubcategory = asyncHandler(async (req, res, next) => {

    const { subcategoryId, categoryId } = req.params;
    const subcategory = await subcategoryModel.findOne({ _id: subcategoryId, categoryId });
    if (!subcategory) {
        return next(new Error(`invalid subcategory id or category id`, { cause: 400 }));
    }
    const name = req.body.name?.toLowerCase();
    if (name) {
        if (subcategory.name === name) {
            return next(new Error(`old name match new name`, { cause: 400 }));
        }
        if (await subcategoryModel.findOne({ name })) {
            return next(new Error(`Duplicate subcategory name`, { cause: 400 }));
        }
        subcategory.name = name;
        subcategory.slug = slugify(name);
    }
    if (req.file) {
        const { public_id, secure_url } = await cloudinary.uploader.upload(req.file.path, { folder: `${process.env.APP_NAME}/subcategory` });
        await cloudinary.uploader.destroy(subcategory.image.public_id);
        subcategory.image = { public_id, secure_url };
    }
    subcategory.updatedBy = req.owner._id;
    await subcategory.save();
    return res.status(201).json({ message: 'success', subcategory });
})

export const getSpecificSubcategory = asyncHandler(async (req, res, next) => {
    const { categoryId } = req.params;
    const subcategory = await subcategoryModel.find({ categoryId }).populate('categoryId');
    return res.status(200).json({ message: 'success', subcategory });
})

export const getAllSubcategories = asyncHandler(async (req, res, next) => {

    const subcategories = await subcategoryModel.find({ createdBy: req.params.ownerId }).populate({
        path: 'categoryId',
        select: 'name image'
    });
    return res.status(200).json({ message: 'success', subcategories });
})

export const getProducts = asyncHandler(async (req, res, next) => {

    const { subcategoryId } = req.params;
    const products = await subcategoryModel.find({ _id: subcategoryId }).select('products').populate({
        path: 'products',
        match: { isDeleted: { $eq: false } }
    })
    return res.status(201).json({ message: 'success', products });
})

export const deleteSubcategory = asyncHandler(async (req, res, next) => {

    const { subcategoryId } = req.params;
    const subcategory = await subcategoryModel.findById(subcategoryId);
    if (!subcategory) {
        return next(new Error(`subcategory not exists`, { cause: 400 }));
    }
    await productModel.deleteMany({ subcategoryId });
    await subcategoryModel.deleteOne({ subcategoryId });
    return res.status(200).json({ message: 'success' });
})