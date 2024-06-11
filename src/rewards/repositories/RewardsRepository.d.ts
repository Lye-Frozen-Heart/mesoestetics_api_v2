import { Reward } from "../../types";

export interface RewardsRepository {
  getAllRewards: () => Promise<Reward[]>;
  getReward: (id: string) => Promise<Reward | null>;
  addReward: (Reward: Reward) => Promise<Reward | null>;
  updateReward: (id: string, reward: Reward) => Promise<Reward | null>;
  removeReward: (id: string) => Promise<string | null>;
}
