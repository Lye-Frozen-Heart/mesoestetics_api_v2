"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __importStar(require("mongoose"));
const RewardSchema = new mongoose.Schema({
    reward_title: String,
    description: String,
    points_needed: Number,
    type: String,
    image: String,
    created_at: Date,
}, { collection: "rewards", strict: true });
exports.default = mongoose.model("Reward", RewardSchema);
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
