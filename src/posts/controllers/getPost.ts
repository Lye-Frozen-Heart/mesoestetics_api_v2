const getPost = (repository) => {
  return async (req, res) => {
    const posts = await repository.getPost(req.params.id);
    return res.json({ ok: true, posts });
  };
};

export default getPost;
