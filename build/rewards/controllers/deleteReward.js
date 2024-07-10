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
const deleteReward = (repository) => {
    return (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id: rewardId } = req.params;
        const elementExists = yield repository.getReward(rewardId);
        if (!elementExists) {
            return res
                .status(404)
                .json({ error: `Reward with id ${rewardId} does not exist` });
        }
        yield repository.removeReward(rewardId);
        return res
            .status(200)
            .json({ ok: true, msg: "Reward deleted successfully!" });
    });
};
exports.default = deleteReward;
