"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createPost_1 = __importDefault(require("./createPost"));
const deletePost_1 = __importDefault(require("./deletePost"));
const getAllPosts_1 = __importDefault(require("./getAllPosts"));
const updatePost_1 = __importDefault(require("./updatePost"));
const PostsController = (repository) => ({
    getAllPosts: (0, getAllPosts_1.default)(repository),
    createPost: (0, createPost_1.default)(repository),
    updatePost: (0, updatePost_1.default)(repository),
    deletePost: (0, deletePost_1.default)(repository),
});
exports.default = PostsController;
