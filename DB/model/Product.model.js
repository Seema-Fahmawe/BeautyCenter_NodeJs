import mongoose, { Schema, Types, model } from "mongoose";

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    mainImage: {
        type: Object,
        required: true,
    },
    subImages: {
        type: Object,
        required: true,
    },
    price: {
        type: Number,
        default: 1,
        required: true,
    },
    description: {
        type: String,
    },
    discount: {
        type: Number,
        default: 0,
    },
    finalPrice: {
        type: Number,
        default: 1,
    },
    categoryId: {
        type: Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    subcategoryId: {
        type: Types.ObjectId,
        ref: 'Subcategory',
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
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
    timestamps: true,
})

const productModel = mongoose.models.Product || model('Product', productSchema);
export default productModel;