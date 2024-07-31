const likePost = (repository) => {
  return async (req, res) => {
    const postId = req.params.id;
    const usernameToCheck = req.body.username;
    try {
      if (!postId) return res.status(404).json({ message: "Id not found" });
      const postToUpdate = await repository.getPost(postId);
      if (!postToUpdate)
        return res.status(404).json({ message: "Post not found" });
      const usernameIncluded = postToUpdate.likes.includes(usernameToCheck);
      let likesToBeUpdated = [];
      if (usernameIncluded) {
        likesToBeUpdated = [
          ...postToUpdate.likes.filter(
            (likedUsername) => likedUsername !== usernameToCheck
          ),
        ];
      }
      if (!usernameIncluded) {
        likesToBeUpdated = [...postToUpdate.likes, usernameToCheck];
      }

      await repository.likePost(postId, likesToBeUpdated);

      return res.status(200).json({ ok: true });
    } catch (error) {
      console.error("Error liking post:", error);
      res.status(500).json({ message: "Error liking post", error });
    }
  };
};

export default likePost;
