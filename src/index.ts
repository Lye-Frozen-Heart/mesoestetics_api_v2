import express from 'express'
import postsRouter from './routes/posts'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config({ path: '../.env' })
const app = express()

const API_URL: string | undefined = process.env.MONGO_URL

if (API_URL == null) {
  console.error('Error: La variable de entorno MONGO_URL no está definida.')
  process.exit(1)
}
app.use(express.json())
mongoose.Promise = global.Promise
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
mongoose.connect(API_URL, {}).then(() => {
  console.log('Successfully connected to the database!')
}).catch((error: any) => {
  console.log('Could not connect to the database. Exiting...', error)
  process.exit()
})

const PORT = 8786

app.get('/ping', (_request, res) => {
  console.log('Someone pinged here!! ')
  res.send('pong')
})
app.use('/api/posts', postsRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
