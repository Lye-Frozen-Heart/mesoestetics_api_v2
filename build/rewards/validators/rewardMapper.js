"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateReward = void 0;
function validateReward(reward) {
    if (typeof reward !== "object" || reward === null)
        return false;
    const { reward_title, description, points_needed, type } = reward;
    return (typeof reward_title === "string" &&
        typeof description === "string" &&
        typeof points_needed === "number" &&
        (type === "Product" || type === "Other"));
}
exports.validateReward = validateReward;
