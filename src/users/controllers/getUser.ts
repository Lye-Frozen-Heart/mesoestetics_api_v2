const getUser = (repository) => {
  return async (req, res) => {
    const user = await repository.getUser(req.params.id);
    return res.json({ ok: true, user });
  };
};
export default getUser;
