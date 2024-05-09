import mongoose from "mongoose"
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  pictures:Array,
  discount: Number,
  created_at:Date
});

productSchema.virtual('reward', {
  ref: 'Reward',
  localField: 'id',
  foreignField: 'product_id',
  justOne: true 
});

productSchema.set('toObject', { virtuals: true });
productSchema.set('toJSON', { virtuals: true });

const ProductModel = mongoose.model('ProductModel', productSchema);

module.exports = ProductModel;
