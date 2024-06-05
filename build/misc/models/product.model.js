"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    name: String,
    description: String,
    price: Number,
    pictures: Array,
    discount: Number,
    created_at: Date
});
productSchema.virtual('reward', {
    ref: 'Reward',
    localField: 'id',
    foreignField: 'product_id',
    justOne: true
});
productSchema.set('toObject', { virtuals: true });
productSchema.set('toJSON', { virtuals: true });
const ProductModel = mongoose_1.default.model('ProductModel', productSchema);
module.exports = ProductModel;
