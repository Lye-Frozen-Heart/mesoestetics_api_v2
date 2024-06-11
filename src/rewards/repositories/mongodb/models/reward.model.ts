import * as mongoose from "mongoose";
import { Reward } from "../../../../types";
const RewardSchema = new mongoose.Schema(
  {
    reward_title: String,
    description: String,
    points_needed: Number,
    type: String,
    created_at: Date,
  },
  { collection: "rewards", strict: true }
);
export default mongoose.model<Reward>("Reward", RewardSchema);
//OLD
// import mongoose from "mongoose"
// const rewardSchema = new mongoose.Schema({
//   product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
//   reward_title: String,
//   description: String,
//   points_needed: Number,
//   amount: Number,
//   discount: Number,
//   type: String,
//   created_at:Date
// });

// const Reward = mongoose.model('Reward', rewardSchema);

// module.exports = Reward;
