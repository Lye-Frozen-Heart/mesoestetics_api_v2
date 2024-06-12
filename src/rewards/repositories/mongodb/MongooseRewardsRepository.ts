import { Reward } from "../../../types";
import { RewardsRepository } from "../RewardsRepository";
import { lineRed } from "../../../utils/logger";
import rewardsModel from "./models/reward.model";
import { isValidObjectId } from "../../../utils";
import dayjs from "dayjs";
const MongooseRewardsRepository = (): RewardsRepository => {
  return {
    getAllRewards: async function (): Promise<Reward[]> {
      try {
        const rewards = await rewardsModel.find({});
        return rewards;
      } catch (error) {
        lineRed(`Error trying to find rewards: ${error}`);
        throw error;
      }
    },
    getReward: async function (id: string): Promise<Reward | null> {
      if (!isValidObjectId(id)) return null;
      try {
        const reward = await rewardsModel.findById(id);
        if (reward != null) return reward;
        return null;
      } catch (error) {
        lineRed(
          `Error trying to find the reward with id ${id}, error found: ${error}`
        );
        return null;
      }
    },
    addReward: async function (reward: Reward): Promise<Reward | null> {
      try {
        const { reward_title, description, points_needed, image } = reward;
        const newReward = new rewardsModel({
          reward_title,
          description,
          points_needed: points_needed ?? 500,
          image: image ?? "",
          created_at: dayjs().toISOString(),
          type: "Product",
        });
        await newReward.save();
        return newReward;
      } catch (error) {
        lineRed(`Error trying to save the new reward: ${error}`);
        return null;
      }
    },
    updateReward: async function (
      id: string,
      reward: Reward
    ): Promise<Reward | null> {
      if (!isValidObjectId(id)) return null;
      try {
        const { reward_title, description, points_needed, image } = reward;
        await rewardsModel.findByIdAndUpdate(id, {
          reward_title,
          description,
          points_needed: points_needed ?? 500,
          image: image ?? "",
        });
        return reward;
      } catch (error) {
        lineRed(
          `Error trying to update the reward with id: ${id}, error found: ${error}`
        );
        return null;
      }
    },
    removeReward: async function (id: string): Promise<string | null> {
      if (!isValidObjectId(id)) return null;
      try {
        await rewardsModel.findByIdAndDelete(id);
        return id;
      } catch (error) {
        lineRed(
          `Error trying to remove the reward with id: ${id}, error found: ${error}`
        );
        return null;
      }
    },
  };
};
export default MongooseRewardsRepository;
