import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import {
  lineDivider,
  lineFeed,
  lineGreen,
  linePurple,
  lineRed,
  log,
} from "./utils/logger";
import postsRouterIoC from "./posts/router/postRouter";
import MongoosePostsRepository from "./posts/repositories/mongodb/MongoosePostsRepository";
import usersRouterIoC from "./users/router/userRouter";
import MongooseUsersRepository from "./users/repositories/mongodb/MongooseUsersRepository";

const API_URL = process.env.MONGO_URL ?? "undefined";
const PORT = process.env.PORT ?? 6060;

const postsInMemoryRepository = MongoosePostsRepository();
const usersInMemoryRepository = MongooseUsersRepository();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.Promise = global.Promise;

postsRouterIoC(app, postsInMemoryRepository);
usersRouterIoC(app, usersInMemoryRepository);
//usersRouterIoC(app, usersInMemoryRepository);
app.listen(PORT, () => {
  lineDivider();
  lineFeed();
  linePurple(`💻 Server running on port ${PORT}`);
  lineFeed();
  mongoose
    .connect(API_URL, {})
    .then(() => {
      lineGreen("🎈 Successfully connected to the database!");
      lineFeed();
      lineDivider();
    })
    .catch((error: any) => {
      lineRed("Could not connect to the database. Exiting...");
      log(error);
      process.exit();
    });
});
