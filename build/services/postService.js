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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findPostByIdAndDelete = exports.addPostEntry = exports.findPostById = exports.getMongoDBPosts = void 0;
/* eslint-disable new-cap */
/* eslint-disable @typescript-eslint/naming-convention */
const post_model_1 = __importDefault(require("../models/post.model"));
const getMongoDBPosts = () => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield post_model_1.default.find({});
    return posts;
});
exports.getMongoDBPosts = getMongoDBPosts;
const findPostById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield post_model_1.default.findById(id);
        if (post != null) {
            console.log('LLEGO');
            const _a = post === null || post === void 0 ? void 0 : post.toObject(), { _id, user_id, created_at } = _a, restOfPost = __rest(_a, ["_id", "user_id", "created_at"]);
            return restOfPost;
        }
        return null;
    }
    catch (error) {
        throw new Error('Error al buscar el post por ID');
    }
});
exports.findPostById = findPostById;
const addPostEntry = (title, description, images, tags) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newPost = new post_model_1.default({
            title,
            description,
            images,
            tags,
            status: 'Cancelled',
            created_at: new Date(),
            user_id: 1
        });
        yield newPost.save();
        return yield newPost.toObject();
    }
    catch (error) {
        throw new Error('Error al guardar el nuevo post en MongoDB');
    }
});
exports.addPostEntry = addPostEntry;
const findPostByIdAndDelete = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield post_model_1.default.findByIdAndDelete(id);
    }
    catch (error) {
        throw new Error('Error al eliminar el post por ID');
    }
});
exports.findPostByIdAndDelete = findPostByIdAndDelete;
