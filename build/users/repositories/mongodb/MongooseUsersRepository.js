"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../../../utils/logger");
const user_model_1 = __importDefault(require("./models/user.model"));
const utils_1 = require("../../../utils");
const dayjs_1 = __importDefault(require("dayjs"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const apiSecret = process.env.API_SECRET;
const MongooseUsersRepository = () => {
    return {
        getAllUsers: function () {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const users = yield user_model_1.default.find({});
                    return users;
                }
                catch (error) {
                    (0, logger_1.lineRed)(`Error trying to find users: ${error}`);
                    throw error;
                }
            });
        },
        login: function (userContent) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const { username, password } = userContent;
                    const user = yield user_model_1.default.findOne({ username });
                    if (!user)
                        return null;
                    const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
                    if (!isPasswordValid)
                        return null;
                    const token = jsonwebtoken_1.default.sign({ id: user._id, username: user.username, role: user.role }, apiSecret, {
                        expiresIn: "4h",
                    });
                    return { token, username: user.username, role: user.role };
                }
                catch (error) {
                    (0, logger_1.lineRed)(`Error trying to log in, error: ${error}`);
                    return null;
                }
            });
        },
        register: function (userContent) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const { username, password, email } = userContent;
                    const existingUser = yield user_model_1.default.findOne({ username });
                    if (existingUser)
                        return null;
                    const existingEmail = yield user_model_1.default.findOne({ email });
                    if (existingEmail)
                        return null;
                    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                    const newUser = new user_model_1.default({
                        username,
                        password: hashedPassword,
                        email,
                        created_at: (0, dayjs_1.default)().toISOString(),
                        liked_posts: [],
                        points: 0,
                        role: "Regular",
                    });
                    yield newUser.save();
                    return newUser;
                }
                catch (error) {
                    (0, logger_1.lineRed)(`Error trying to register user: ${error}`);
                    return null;
                }
            });
        },
        updateUser: function (id, user) {
            return __awaiter(this, void 0, void 0, function* () {
                if (!(0, utils_1.isValidObjectId)(id))
                    return null;
                try {
                    const { username, password, email, points, role } = user;
                    yield user_model_1.default.findByIdAndUpdate(id, {
                        username,
                        password,
                        email,
                        points,
                        role,
                    });
                    return user;
                }
                catch (error) {
                    (0, logger_1.lineRed)(`Error trying to update the user with id: ${id}, error found: ${error}`);
                    return null;
                }
            });
        },
        removeUser: function (id) {
            return __awaiter(this, void 0, void 0, function* () {
                if (!(0, utils_1.isValidObjectId)(id))
                    return null;
                try {
                    yield user_model_1.default.findByIdAndDelete(id);
                    return id;
                }
                catch (error) {
                    (0, logger_1.lineRed)(`Error trying to remove the user with id: ${id}, error found: ${error}`);
                    return null;
                }
            });
        },
        getUser: function (id) {
            return __awaiter(this, void 0, void 0, function* () {
                if (!(0, utils_1.isValidObjectId)(id))
                    return null;
                try {
                    const user = yield user_model_1.default.findById(id);
                    return user;
                }
                catch (error) {
                    (0, logger_1.lineRed)(`Error trying to find the user with id: ${id}, error found: ${error}`);
                    return null;
                }
            });
        },
    };
};
exports.default = MongooseUsersRepository;
