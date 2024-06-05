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
const MongoosePostsRepository = () => {
    return {
        getAllPosts: function () {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const posts = yield post_model_1.default.find({});
                    return posts;
                }
                catch (error) {
                    (0, logger_1.lineRed)(`Error al buscar posts: ${error}`);
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
                    (0, logger_1.lineRed)(`Error al buscar el post: ${error}`);
                    return null;
                }
            });
        },
        addPost: function (Post) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const { title, description, images, tags } = Post;
                    const newPost = new post_model_1.default({
                        title,
                        description,
                        images,
                        tags,
                        likes: 0,
                        status: "OnAir",
                        created_at: new Date().toISOString(),
                        user_id: null,
                    });
                    yield newPost.save();
                    return newPost;
                }
                catch (error) {
                    (0, logger_1.lineRed)(`Error al guardar el nuevo post: ${error}`);
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
                    (0, logger_1.lineRed)(`Error al actualizar los likes del post: ${error}`);
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
                    (0, logger_1.lineRed)(`Error al eliminar el post: ${error}`);
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
                    (0, logger_1.lineRed)(`Error al actualizar los likes del post: ${error}`);
                    return null;
                }
            });
        },
    };
};
exports.default = MongoosePostsRepository;
