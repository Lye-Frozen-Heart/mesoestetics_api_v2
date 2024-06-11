const deletePost = (repository) => {
  return async (req, res) => {
    const { id: postId } = req.params;

    const elementExists = await repository.getPost(postId);

    if (!elementExists) {
      return res
        .status(404)
        .json({ error: `Post with id ${postId} does not exist` });
    }

    await repository.removePost(postId);

    return res
      .status(200)
      .json({ ok: true, msg: "Post deleted successfully!" });
  };
};

export default deletePost;
