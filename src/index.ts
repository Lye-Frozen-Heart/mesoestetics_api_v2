import express, { NextFunction, Request, Response } from 'express'
import postsRouter from './routes/posts'
import mongoose from 'mongoose'
import { lineDivider, lineFeed, lineGreen, linePurple, lineRed, log } from './utils/logger'
const app = express()

const API_URL: string | undefined = process.env.MONGO_URL;
const PORT: string = process.env.PORT ;


if (API_URL == null) {
  lineRed('Error: La variable de entorno MONGO_URL no está definida.')
  process.exit(1)
}
app.use(express.json())
mongoose.Promise = global.Promise
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions


app.get('/ping', (_request, res) => {
  console.log('Someone pinged here!! ')
  res.send('pong')
})
app.use('/api/posts', postsRouter)

app.use((err: Error, _req: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).send('Something broke!')
})

app.use((_req, res) => {
  res.status(404).send("Sorry can't find that!")
})

app.listen(PORT, () => {
  lineDivider()
  lineFeed()
  linePurple(`💻 Server running on port ${PORT}`)
  lineFeed()
  mongoose.connect(API_URL, {}).then(() => {
  lineGreen('🎈 Successfully connected to the database!')
  lineFeed()
  lineDivider()
}).catch((error: any) => {
  lineRed('Could not connect to the database. Exiting...')
  log(error)
  process.exit()
})
})
