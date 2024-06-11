import createReward from "./createReward";
import deleteReward from "./deleteReward";
import getAllRewards from "./getAllRewards";
import getReward from "./getReward";
import updateReward from "./updateReward";
const RewardsController = (repository) => ({
  getAllRewards: getAllRewards(repository),
  getReward: getReward(repository),
  createReward: createReward(repository),
  updateReward: updateReward(repository),
  deleteReward: deleteReward(repository),
});
export default RewardsController;
