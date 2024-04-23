import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, },
        description: { type: String, required: true, },
        image: { type: String, required: true },
        categories: { type: Array },
        color: { type: String },
        price: { type: Number, required: true },
        comparePrice: { type: Number, required: true },
        review: { type: Number, require: true },
        reviewCount : {type : Number},
        bestSelling : {type : Boolean}
    },
    { timestamps: true }
);

const Product = mongoose.models.product || mongoose.model("Product", ProductSchema);

export default Product





