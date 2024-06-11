import { validateUser } from "../validators/userMapper";

const updateUser = (repository) => {
  return async (req, res) => {
    const userContent = req.body;
    const { id: userId } = req.params;
    const userIsValid = validateUser(userContent);
    if (!userIsValid)
      return res.status(400).json({ error: "Invalid property" });

    const elementExists = await repository.getUser(userId);

    if (!elementExists) {
      return res
        .status(404)
        .json({ error: `User with id ${userId} does not exist` });
    }
    await repository.updateUser(userId, userContent);
    return res.status(200).json({ ok: true });
  };
};
export default updateUser;
