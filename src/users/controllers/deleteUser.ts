const deleteUser = (repository) => {
  return async (req, res) => {
    const { id: userId } = req.params;

    const elementExists = await repository.getUser(userId);

    if (!elementExists) {
      return res
        .status(404)
        .json({ error: `User with id ${userId} does not exist` });
    }

    await repository.removeUser(userId);

    return res
      .status(200)
      .json({ ok: true, msg: "User deleted successfully!" });
  };
};
export default deleteUser;
