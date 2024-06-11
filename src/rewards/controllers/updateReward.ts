import { validateReward } from "../validators/rewardMapper";

const updateReward = (repository) => {
  return async (req, res) => {
    const rewardContent = req.body;
    const { id: rewardId } = req.params;
    const rewardIsValid = validateReward(rewardContent);
    if (!rewardIsValid)
      return res.status(400).json({ error: "Invalid property" });

    const elementExists = await repository.getReward(rewardId);

    if (!elementExists) {
      return res
        .status(404)
        .json({ error: `Reward with id ${rewardId} does not exist` });
    }
    await repository.updateReward(rewardId, rewardContent);
    return res.status(200).json({ ok: true });
  };
};
export default updateReward;
