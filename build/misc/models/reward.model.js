"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const rewardSchema = new mongoose_1.default.Schema({
    product_id: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Product' },
    reward_title: String,
    description: String,
    points_needed: Number,
    amount: Number,
    discount: Number,
    type: String,
    created_at: Date
});
const Reward = mongoose_1.default.model('Reward', rewardSchema);
module.exports = Reward;
