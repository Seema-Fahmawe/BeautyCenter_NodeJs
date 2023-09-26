import mongoose, { Schema, Types, model } from "mongoose";

const wishlistSchema = new Schema({
    userId: {
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    },
    products: [{
        productId: { type: Types.ObjectId, ref: 'Product', required: true },
        name: { type: String },
        description: { type: String },
        image: { type: Object },
        createdBy: { type: Types.ObjectId, ref: 'Owner' },
    }],
}, {
    timestamps: true,
})

const wishlistModel = mongoose.models.Wishlist || model('Wishlist', wishlistSchema);
export default wishlistModel;