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
Object.defineProperty(exports, "__esModule", { value: true });
const rewardMapper_1 = require("../validators/rewardMapper");
const updateReward = (repository) => {
    return (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const rewardContent = req.body;
        const { id: rewardId } = req.params;
        const rewardIsValid = (0, rewardMapper_1.validateReward)(rewardContent);
        if (!rewardIsValid)
            return res.status(400).json({ error: "Invalid property" });
        const elementExists = yield repository.getReward(rewardId);
        if (!elementExists) {
            return res
                .status(404)
                .json({ error: `Reward with id ${rewardId} does not exist` });
        }
        yield repository.updateReward(rewardId, rewardContent);
        return res.status(200).json({ ok: true });
    });
};
exports.default = updateReward;
