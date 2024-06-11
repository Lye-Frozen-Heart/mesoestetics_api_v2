const getPost = (repository) => {
  return async (req, res) => {
    const post = await repository.getPost(req.params.id);
    return res.json({ ok: true, post });
  };
};

export default getPost;
