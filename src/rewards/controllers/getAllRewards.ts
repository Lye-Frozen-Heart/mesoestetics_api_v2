const getAllRewards = (repository) => {
  return async (_req, res) => {
    const rewards = await repository.getAllRewards();
    return res.json({ ok: true, rewards });
  };
};
export default getAllRewards;
