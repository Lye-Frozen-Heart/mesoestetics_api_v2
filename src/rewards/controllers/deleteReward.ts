const deleteReward = (repository) => {
  return async (req, res) => {
    const { id: rewardId } = req.params;

    const elementExists = await repository.getReward(rewardId);

    if (!elementExists) {
      return res
        .status(404)
        .json({ error: `Reward with id ${rewardId} does not exist` });
    }

    await repository.removeReward(rewardId);

    return res
      .status(200)
      .json({ ok: true, msg: "Reward deleted successfully!" });
  };
};
export default deleteReward;
