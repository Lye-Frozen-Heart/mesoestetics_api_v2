import dayjs from "dayjs";
import { validatePost } from "../validators/postMapper";
const createPost = (repository) => {
  return async (req, res) => {
    const post = req.body;
    const postIsValid = validatePost(post);
    if (!postIsValid) return res.status(400).json({ error: "Missing data..." });
    const newPost = {
      ...post,
      created_at: dayjs().toISOString(),
    };

    await repository.addPost(newPost);
    return res
      .status(201)
      .json({ ok: true, msg: "Post created successfully!" });
  };
};

export default createPost;
