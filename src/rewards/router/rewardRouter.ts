import { Router } from "express";
import RewardsController from "../controllers/RewardsController";
const createRewardsRouter = (repository) => {
  const rewardsRouter = Router();
  const rewardsController = RewardsController(repository);

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
export default rewardsRouterIoC;
