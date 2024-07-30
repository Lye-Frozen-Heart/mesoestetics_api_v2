// const addLike = async (req, res) => {
//     try {
//       const { id } = req.params;
//       const { username } = req.body;
//       const post = await Post.findById(id);
//       if (!post) {
//         return res.status(404).json({ error: 'Post not found' });
//       }
//       if (!post.likes.includes(username)) {
//         post.likes.push(username);
//         await post.save();
//       }
//       res.status(200).json(post);
//     } catch (error) {
//       res.status(500).json({ error: 'Server error' });
//     }
//   };