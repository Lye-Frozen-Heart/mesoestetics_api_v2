const getPost = (repository) => {
  return async (req, res) => {
    try {
      const post = await repository.getPost(req.params.id);
      if (!post) {
        return res.status(404).json({ ok: false, message: 'Post not found' });
      }

      const userHasLiked = req.user && post.likes.includes(req.user.username);

      return res.json({
        ok: true,
        post: {
          ...post,
          likedByCurrentUser: userHasLiked,
          likesCount: post.likes.length
        }
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ ok: false, message: 'Server error' });
    }
  };
};

export default getPost;