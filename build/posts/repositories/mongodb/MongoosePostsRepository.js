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
const post_model_1 = __importDefault(require("./models/post.model"));
const utils_1 = require("../../../utils");
const dayjs_1 = __importDefault(require("dayjs"));
const MongoosePostsRepository = () => {
    return {
        getAllPosts: function () {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const posts = yield post_model_1.default.find({});
                    return posts;
                }
                catch (error) {
                    (0, logger_1.lineRed)(`Error trying to find posts: ${error}`);
                    throw error;
                }
            });
        },
        getPost: function (id) {
            return __awaiter(this, void 0, void 0, function* () {
                if (!(0, utils_1.isValidObjectId)(id))
                    return null;
                try {
                    const post = yield post_model_1.default.findById(id);
                    if (post != null)
                        return post;
                    return null;
                }
                catch (error) {
                    (0, logger_1.lineRed)(`Error trying to find the post with id: ${id}, error found: ${error}`);
                    return null;
                }
            });
        },
        addPost: function (Post) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const { title, description, images = [], tags = [], user } = Post;
                    const newPost = new post_model_1.default({
                        title,
                        description,
                        images,
                        tags,
                        likes: 0,
                        status: "OnAir",
                        created_at: (0, dayjs_1.default)().toISOString(),
                        user,
                    });
                    yield newPost.save();
                    return newPost;
                }
                catch (error) {
                    (0, logger_1.lineRed)(`Error trying to save the new post: ${error}`);
                    return null;
                }
            });
        },
        updatePost: function (id, post) {
            return __awaiter(this, void 0, void 0, function* () {
                if (!(0, utils_1.isValidObjectId)(id))
                    return null;
                try {
                    const { title, description, tags, images, likes, status } = post;
                    yield post_model_1.default.findByIdAndUpdate(id, {
                        title,
                        description,
                        tags,
                        images,
                        likes,
                        status,
                    });
                    return post;
                }
                catch (error) {
                    (0, logger_1.lineRed)(`Error trying to update the post with id: ${id}, error found: ${error}`);
                    return null;
                }
            });
        },
        removePost: function (id) {
            return __awaiter(this, void 0, void 0, function* () {
                if (!(0, utils_1.isValidObjectId)(id))
                    return null;
                try {
                    yield post_model_1.default.findByIdAndDelete(id);
                    return id;
                }
                catch (error) {
                    (0, logger_1.lineRed)(`Error trying to remove the post with id: ${id}, error found: ${error}`);
                    return null;
                }
            });
        },
        updateLikesFromPost: function (id, likes) {
            return __awaiter(this, void 0, void 0, function* () {
                if (!(0, utils_1.isValidObjectId)(id))
                    return null;
                try {
                    const data = yield post_model_1.default.findByIdAndUpdate(id, { likes });
                    return data;
                }
                catch (error) {
                    (0, logger_1.lineRed)(`Error trying to update the likes from post: ${id}, error found: ${error}`);
                    return null;
                }
            });
        },
    };
};
exports.default = MongoosePostsRepository;
