import dayjs from "dayjs";
//import { validateReward } from "../validators/rewardMapper";
const createReward = (repository) => {
  return async (req, res) => {
    const reward = req.body;
    //const rewardIsValid = validateReward(reward);
    const rewardExists = await repository.getReward(reward.id);
    //if (!rewardIsValid) return res.status(400).json({ error: "Missing data..." });
    if (rewardExists)
      return res.status(404).json({ error: "Reward already exists" });

    const newReward = {
      ...reward,
      created_at: dayjs().toISOString(),
    };

    await repository.addReward(newReward);
    return res
      .status(201)
      .json({ ok: true, msg: "Reward created successfully!" });
  };
};
export default createReward;
