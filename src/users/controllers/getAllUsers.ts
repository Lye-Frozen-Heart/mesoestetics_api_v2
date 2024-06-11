const getAllUsers = (repository) => {
  return async (_req, res) => {
    const users = await repository.getAllUsers();
    return res.json({ ok: true, users });
  };
};
export default getAllUsers;
