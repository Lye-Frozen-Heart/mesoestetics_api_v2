const getUser = (repository) => {
  return async (req, res) => {
    const { id: userId } = req.params.id;

    await repository.getUser(userId);

    return res.status(200).json({ ok: true });
  };
};
export default getUser;
