/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import * as postService from '../services/postService'
const router = express.Router()

router.get('/', async (_, res) => {
  await postService.getMongoDBPosts().then((response) => {
    res.send(response)
  })
})
router.get('/:id', async (req, res) => {
  await postService.findPostById(req.params.id).then((response) => {
    res.send(response)
  })
})
router.post('/', (req, res) => {
  const { title, description, images, tags } = req.body
  const newPost = postService.addPostEntry(
    title,
    description,
    images,
    tags
  )
  res.json(newPost)
})
router.delete('/:id', (req, res) => {
  const post = postService.findPostByIdAndDelete(req.params.id)
  return post != null ? res.send(post) : res.sendStatus(404)
})
export default router
