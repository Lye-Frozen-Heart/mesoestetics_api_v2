import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import {
    lineDivider,
    lineFeed,
    lineGreen,
    linePurple,
    lineRed,
    log
} from './utils/logger';
import postsRouterIoC from './posts/router/postRouter';
import usersRouterIoC from './users/router/userRouter';
import rewardsRouterIoC from './rewards/router/rewardRouter';
import MongoosePostsRepository from './posts/repositories/mongodb/MongoosePostsRepository';
import MongooseUsersRepository from './users/repositories/mongodb/MongooseUsersRepository';
import MongooseRewardsRepository from './rewards/repositories/mongodb/MongooseRewardsRepository';
import emailRouter from './email/router/emailRouter';
import dotenv from 'dotenv';

dotenv.config();

const API_URL = process.env.MONGO_URL ?? 'undefined';
const PORT = process.env.PORT ?? 6060;

const postsRepository = MongoosePostsRepository();
const usersRepository = MongooseUsersRepository();
const rewardsRepository = MongooseRewardsRepository();
//usersRouterIoC(app, usersInMemoryRepository);
const app = express();
app.use(cors());
app.use(express.json());

mongoose.Promise = global.Promise;

postsRouterIoC(app, postsRepository);
usersRouterIoC(app, usersRepository);
rewardsRouterIoC(app, rewardsRepository);
app.use('/api', emailRouter);

app.listen(PORT, () => {
    lineDivider();
    lineFeed();
    linePurple(`💻 Server running on port ${PORT}`);
    lineFeed();
    mongoose
        .connect(API_URL, {})
        .then(() => {
            lineGreen('🎈 Successfully connected to the database!');
            lineFeed();
            lineDivider();
        })
        .catch((error: any) => {
            lineRed('Could not connect to the database. Exiting...');
            log(error);
            process.exit();
        });
});