"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createReward_1 = __importDefault(require("./createReward"));
const deleteReward_1 = __importDefault(require("./deleteReward"));
const getAllRewards_1 = __importDefault(require("./getAllRewards"));
const getReward_1 = __importDefault(require("./getReward"));
const updateReward_1 = __importDefault(require("./updateReward"));
const RewardsController = (repository) => ({
    getAllRewards: (0, getAllRewards_1.default)(repository),
    getReward: (0, getReward_1.default)(repository),
    createReward: (0, createReward_1.default)(repository),
    updateReward: (0, updateReward_1.default)(repository),
    deleteReward: (0, deleteReward_1.default)(repository),
});
exports.default = RewardsController;
