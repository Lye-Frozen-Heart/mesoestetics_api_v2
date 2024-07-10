"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const RewardsController_1 = __importDefault(require("../controllers/RewardsController"));
const createRewardsRouter = (repository) => {
    const rewardsRouter = (0, express_1.Router)();
    const rewardsController = (0, RewardsController_1.default)(repository);
    rewardsRouter.get("/", rewardsController.getAllRewards);
    rewardsRouter.get("/:id", rewardsController.getReward);
    rewardsRouter.post("/", rewardsController.createReward);
    rewardsRouter.put("/:id", rewardsController.updateReward);
    rewardsRouter.delete("/:id", rewardsController.deleteReward);
    return rewardsRouter;
};
const rewardsRouterIoC = (app, repository) => {
    const rewardsRouter = createRewardsRouter(repository);
    app.use("/rewards", rewardsRouter);
};
exports.default = rewardsRouterIoC;
