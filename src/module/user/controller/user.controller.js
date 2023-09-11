
import { asyncHandler } from './../../../service/errorHandling.js';
import cloudinary from './../../../service/cloudinary.js';
import userModel from '../../../../DB/model/User.model.js';
import { compare, hash } from '../../../service/hashAndCompare.js';

export const profilePic = asyncHandler(async (req, res, next) => {

  let user = await userModel.findById(req.user._id);
  if (user.image?.public_id) {
    await cloudinary.uploader.destroy(user.image.public_id);
  }
  const { public_id, secure_url } = await cloudinary.uploader.upload(req.file.path, { folder: `${process.env.APP_NAME}/userPic` });
  user = await userModel.updateOne({ image: { public_id, secure_url } });
  if (user.modifiedCount) {
    return res.status(201).json({ message: 'success', user });
  }
  return next(new Error('Error uploading file', { cause: 400 }));
})

export const getUsers = asyncHandler(async (req, res, next) => {
  const users = await userModel.find({ role: 'User' });
  return res.status(200).json({ message: 'success', users });
})

export const getSpecificUser = asyncHandler(async (req, res, next) => {
  const user = await userModel.findById(req.params.userId);
  return res.json({ message: 'success', user });
})

export const updatePassword = asyncHandler(async (req, res, next) => {
  let { oldPassword, newPassword } = req.body;
  const user = await userModel.findById(req.user?._id);
  if (!user) {
    return next(new Error(`user not exists`, { cause: 400 }));
  }
  const match = compare(oldPassword, user.password);
  if (!match) {
    return next(new Error("invalid password ", { cause: 400 }));
  }
  newPassword = hash(newPassword);
  await userModel.findByIdAndUpdate(req.user._id, { password: newPassword });
  return res.status(200).json({ message: 'success' });
})



