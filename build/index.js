"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const logger_1 = require("./utils/logger");
const postRouter_1 = __importDefault(require("./posts/router/postRouter"));
const userRouter_1 = __importDefault(require("./users/router/userRouter"));
const rewardRouter_1 = __importDefault(require("./rewards/router/rewardRouter"));
const MongoosePostsRepository_1 = __importDefault(require("./posts/repositories/mongodb/MongoosePostsRepository"));
const MongooseUsersRepository_1 = __importDefault(require("./users/repositories/mongodb/MongooseUsersRepository"));
const MongooseRewardsRepository_1 = __importDefault(require("./rewards/repositories/mongodb/MongooseRewardsRepository"));
const API_URL = (_a = process.env.MONGO_URL) !== null && _a !== void 0 ? _a : "undefined";
const PORT = (_b = process.env.PORT) !== null && _b !== void 0 ? _b : 6060;
const postsRepository = (0, MongoosePostsRepository_1.default)();
const usersRepository = (0, MongooseUsersRepository_1.default)();
const rewardsRepository = (0, MongooseRewardsRepository_1.default)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
mongoose_1.default.Promise = global.Promise;
(0, postRouter_1.default)(app, postsRepository);
(0, userRouter_1.default)(app, usersRepository);
(0, rewardRouter_1.default)(app, rewardsRepository);
//usersRouterIoC(app, usersInMemoryRepository);
app.listen(PORT, () => {
    (0, logger_1.lineDivider)();
    (0, logger_1.lineFeed)();
    (0, logger_1.linePurple)(`💻 Server running on port ${PORT}`);
    (0, logger_1.lineFeed)();
    mongoose_1.default
        .connect(API_URL, {})
        .then(() => {
        (0, logger_1.lineGreen)("🎈 Successfully connected to the database!");
        (0, logger_1.lineFeed)();
        (0, logger_1.lineDivider)();
    })
        .catch((error) => {
        (0, logger_1.lineRed)("Could not connect to the database. Exiting...");
        (0, logger_1.log)(error);
        process.exit();
    });
});
