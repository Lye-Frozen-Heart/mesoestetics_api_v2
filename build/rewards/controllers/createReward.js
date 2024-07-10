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
const dayjs_1 = __importDefault(require("dayjs"));
const rewardMapper_1 = require("../validators/rewardMapper");
const createReward = (repository) => {
    return (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const reward = req.body;
        const rewardIsValid = (0, rewardMapper_1.validateReward)(reward);
        const rewardExists = yield repository.getReward(reward.id);
        if (!rewardIsValid)
            return res.status(400).json({ error: "Missing data..." });
        if (rewardExists)
            return res.status(404).json({ error: "Reward already exists" });
        const newReward = Object.assign(Object.assign({}, reward), { created_at: (0, dayjs_1.default)().toISOString() });
        yield repository.addReward(newReward);
        return res
            .status(201)
            .json({ ok: true, msg: "Reward created successfully!" });
    });
};
exports.default = createReward;
