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
const dayjs_1 = __importDefault(require("dayjs"));
const postMapper_1 = require("../validators/postMapper");
const createPost = (repository) => {
    return (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const post = req.body;
        const postIsValid = (0, postMapper_1.validatePost)(post);
        if (!postIsValid)
            return res.status(400).json({ error: "Missing data..." });
        const newPost = Object.assign(Object.assign({}, post), { created_at: (0, dayjs_1.default)().toISOString() });
        yield repository.addPost(newPost);
        return res
            .status(201)
            .json({ ok: true, msg: "Post created successfully!" });
    });
};
exports.default = createPost;
