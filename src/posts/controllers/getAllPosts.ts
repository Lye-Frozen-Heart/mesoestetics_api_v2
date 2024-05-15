const getAllPosts = (repository) => {
  return async (_req, res) => {
    const posts = await repository.getAllPosts();
    return res.json({ ok: true, posts });
  };
};

export default getAllPosts;
