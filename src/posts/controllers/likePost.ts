const likePost = (repository) => {
    return async (req, res) => {
        const { postId } = req.params;
        const { username } = req.body;

        try {
            const post = await repository.getPost(postId);
            //if (!post) return res.status(404).json({ message: 'Post not foundaaa' });
            console.log(post)
            //const usernameIncluded = post.likes.includes(username)

            // const likesWithoutUsername = [
            //     ...post.likes.filter(likedUsername => likedUsername !== username)
            // ]

            // const likesWithUsername = [
            //     ...post.likes.push(username)
            // ]

            // //usernameIncluded ? await repository.likePost(postId, likesWithoutUsername) : await repository.likePost(postId, likesWithUsername)

            // console.log(likesWithUsername)
            // console.log(likesWithoutUsername)
            // return res.status(200).json({ ok: true });
        } catch (error) {
            console.error('Error liking post:', error);
            res.status(500).json({ message: 'Error liking post', error });
        }
    };
};


export default likePost;