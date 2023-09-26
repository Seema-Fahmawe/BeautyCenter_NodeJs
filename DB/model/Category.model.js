import mongoose, { Schema, Types, model } from "mongoose";

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    image: {
        type: Object,
        required: true,
    },
    createdBy: {
        type: Types.ObjectId,
        ref: 'Owner',
        required: true,
    },
    updatedBy: {
        type: Types.ObjectId,
        ref: 'Owner',
        required: true,
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
})

categorySchema.virtual('products', {
    localField: '_id',
    foreignField: 'categoryId',
    ref: 'Product'
})

const categoryModel = mongoose.models.Category || model('Category', categorySchema);
export default categoryModel;