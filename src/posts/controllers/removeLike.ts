// const removeLike = async (req, res) => {
//     try {
//       const { id } = req.params;
//       const { username } = req.body;
//       const post = await Post.findById(id);
//       if (!post) {
//         return res.status(404).json({ error: 'Post not found' });
//       }
//       post.likes = post.likes.filter((user) => user !== username);
//       await post.save();
//       res.status(200).json(post);
//     } catch (error) {
//       res.status(500).json({ error: 'Server error' });
//     }
//   };