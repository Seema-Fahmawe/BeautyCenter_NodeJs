import ownerModel from '../../../../DB/model/Owner.model.js';
import { asyncHandler } from './../../../service/errorHandling.js';

export const updateStatusOwner = asyncHandler(async (req, res, next) => {
    let owner = await ownerModel.findByIdAndUpdate(req.params.ownerId, { status: 'actived' }, { new: true });
    return res.status(200).json({ message: 'success', owner });
})

export const updateOwner = asyncHandler(async (req, res, next) => {

    const { phone, city } = req.body;
    const owner = await ownerModel.findById(req.owner._id);
    if (!owner) {
        return next(new Error(`invalid owner id ${req.params.ownerId}`, { cause: 400 }));
    }
    const centerName = req.body.centerName?.toLowerCase();
    if (centerName) {
        if (owner.centerName === centerName) {
            return next(new Error(`old name match new name`, { cause: 400 }));
        }
        if (await ownerModel.findOne({ centerName })) {
            return next(new Error(`Duplicate center name`, { cause: 400 }));
        }
        owner.centerName = centerName;
    }

    if (phone) {
        if (owner.phone === phone) {
            return next(new Error(`old phone match new phone`, { cause: 400 }));
        }
        if (await ownerModel.findOne({ phone })) {
            return next(new Error(`Duplicate center phone`, { cause: 400 }));
        }
        owner.phone = phone;
    }

    if (city) {
        if (owner.city === city) {
            return next(new Error(`old city match new city`, { cause: 400 }));
        }
        owner.city = city;
    }
    await owner.save();
    return res.status(201).json({ message: 'success', owner });
})

export const getOwners = asyncHandler(async (req, res, next) => {
    const owner = await ownerModel.find();
    return res.status(200).json({ message: 'success', owner });
})

export const ownerDetails = asyncHandler(async (req, res, next) => {
    const owner = await ownerModel.findById(req.params.ownerId);
    return res.status(200).json({ message: 'success', owner });
})

export const deleteOwner = asyncHandler(async (req, res, next) => {
    const { ownerId } = req.params;
    let owner = await ownerModel.findOneAndDelete({ _id: ownerId });
    if (!owner) {
        return next(new Error('this owner not found', { cause: 400 }));
    }
    return res.status(200).json({ message: 'success' });
})

export const getInfoCenter = asyncHandler(async (req, res, next) => {

    const center = await ownerModel.findById(req.params.ownerId).select('ownerName centerName city phone workDays');
    return res.status(200).json({ message: 'success', center });
})

export const getCenters = asyncHandler(async (req, res, next) => {

    const center = await ownerModel.find().select('ownerName centerName city phone workDays');
    return res.status(200).json({ message: 'success', center });
})
