import ownerModel from '../../../../DB/model/Owner.model.js';
import { asyncHandler } from './../../../service/errorHandling.js';

export const updateStatusOwner = asyncHandler(async (req, res, next) => {
    let owner = await ownerModel.findByIdAndUpdate(req.params.ownerId, { status: 'actived' }, { new: true });
    return res.status(200).json({ message: 'success', owner });
})

export const getOwners = asyncHandler(async (req, res, next) => {
    const owner = await ownerModel.find().select('centerName ownerName email city phone');
    return res.status(200).json({ message: 'success', owner });
})

export const ownerDetails = asyncHandler(async (req, res, next) => {
    const owner = await ownerModel.findById(req.params.ownerId);
    return res.status(200).json({ message: 'success', owner });
})

