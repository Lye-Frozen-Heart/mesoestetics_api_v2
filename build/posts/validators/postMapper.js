"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePost = void 0;
function validatePost(post) {
    if (typeof post !== "object" || post === null)
        return false;
    const { title, description } = post;
    return typeof title === "string" && typeof description === "string";
}
exports.validatePost = validatePost;
