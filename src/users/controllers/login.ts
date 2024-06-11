import { validateUser } from "../validators/userMapper";
const login = (repository) => {
  return async (req, res) => {
    const user = req.body;
    const userIsValid = validateUser(user);
    if (!userIsValid) return res.status(400).json({ error: "Missing data..." });

    const response = await repository.login(user);
    if (response === null) {
      return res.status(401).json({ ok: false, msg: "Wrong credentials" });
    }
    return res
      .status(201)
      .json({ ok: true, msg: "User created successfully!", response });
  };
};
export default login;
