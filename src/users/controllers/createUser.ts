import dayjs from "dayjs";
import { validateUser } from "../validators/userMapper";
const createUser = (repository) => {
  return async (req, res) => {
    const user = req.body;
    const userIsValid = validateUser(user);
    const userExists = await repository.getUser(user.id);
    if (!userIsValid) return res.status(400).json({ error: "Missing data..." });
    if (userExists)
      return res.status(404).json({ error: "User already exists" });

    const newUser = {
      ...user,
      created_at: dayjs().toISOString(),
    };

    await repository.addUser(newUser);
    return res
      .status(201)
      .json({ ok: true, msg: "User created successfully!" });
  };
};
export default createUser;
