"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../../../utils/logger");
const reward_model_1 = __importDefault(require("./models/reward.model"));
const utils_1 = require("../../../utils");
const dayjs_1 = __importDefault(require("dayjs"));
const MongooseRewardsRepository = () => {
    return {
        getAllRewards: function () {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const rewards = yield reward_model_1.default.find({});
                    return rewards;
                }
                catch (error) {
                    (0, logger_1.lineRed)(`Error trying to find rewards: ${error}`);
                    throw error;
                }
            });
        },
        getReward: function (id) {
            return __awaiter(this, void 0, void 0, function* () {
                if (!(0, utils_1.isValidObjectId)(id))
                    return null;
                try {
                    const reward = yield reward_model_1.default.findById(id);
                    if (reward != null)
                        return reward;
                    return null;
                }
                catch (error) {
                    (0, logger_1.lineRed)(`Error trying to find the reward with id ${id}, error found: ${error}`);
                    return null;
                }
            });
        },
        addReward: function (reward) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const { reward_title, description, points_needed, image } = reward;
                    const newReward = new reward_model_1.default({
                        reward_title,
                        description,
                        points_needed: points_needed !== null && points_needed !== void 0 ? points_needed : 500,
                        image: image !== null && image !== void 0 ? image : "",
                        created_at: (0, dayjs_1.default)().toISOString(),
                        type: "Product",
                    });
                    yield newReward.save();
                    return newReward;
                }
                catch (error) {
                    (0, logger_1.lineRed)(`Error trying to save the new reward: ${error}`);
                    return null;
                }
            });
        },
        updateReward: function (id, reward) {
            return __awaiter(this, void 0, void 0, function* () {
                if (!(0, utils_1.isValidObjectId)(id))
                    return null;
                try {
                    const { reward_title, description, points_needed, image } = reward;
                    yield reward_model_1.default.findByIdAndUpdate(id, {
                        reward_title,
                        description,
                        points_needed: points_needed !== null && points_needed !== void 0 ? points_needed : 500,
                        image: image !== null && image !== void 0 ? image : "",
                    });
                    return reward;
                }
                catch (error) {
                    (0, logger_1.lineRed)(`Error trying to update the reward with id: ${id}, error found: ${error}`);
                    return null;
                }
            });
        },
        removeReward: function (id) {
            return __awaiter(this, void 0, void 0, function* () {
                if (!(0, utils_1.isValidObjectId)(id))
                    return null;
                try {
                    yield reward_model_1.default.findByIdAndDelete(id);
                    return id;
                }
                catch (error) {
                    (0, logger_1.lineRed)(`Error trying to remove the reward with id: ${id}, error found: ${error}`);
                    return null;
                }
            });
        },
    };
};
exports.default = MongooseRewardsRepository;
