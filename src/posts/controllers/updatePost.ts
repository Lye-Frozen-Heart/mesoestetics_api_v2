import { validatePost } from "../validators/postMapper";

const updatePost = (repository) => {
  return async (req, res) => {
    const postContent = req.body;
    const { id: postId } = req.params;
    const postIsValid = validatePost(postContent);
    if (!postIsValid)
      return res.status(400).json({ error: "Invalid property" });

    const elementExists = await repository.getPost(postId);

    if (!elementExists) {
      return res
        .status(404)
        .json({ error: `Post with id ${postId} does not exist` });
    }
    await repository.updatePost(postId, postContent);
    return res.status(200).json({ ok: true });
  };
};

export default updatePost;
