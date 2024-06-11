const getReward = (repository) => {
  return async (req, res) => {
    const reward = await repository.getReward(req.params.id);
    return res.json({ ok: true, reward });
  };
};
export default getReward;
