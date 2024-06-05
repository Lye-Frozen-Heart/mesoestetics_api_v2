"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTag = exports.validatePost = void 0;
const types_1 = require("../../types");
function validatePost(post) {
    if (typeof post !== "object" || post === null)
        return false;
    const { title, description, images, tags, status, likes } = post;
    return (typeof title === "string" &&
        typeof description === "string" &&
        Array.isArray(images) &&
        images.every((image) => typeof image === "string") &&
        Array.isArray(tags) &&
        tags.every((tag) => validateTag(tag)) &&
        Object.values(types_1.StatusEnum).includes(status) &&
        typeof likes === "number");
}
exports.validatePost = validatePost;
function validateTag(tag) {
    return typeof tag === "string";
}
exports.validateTag = validateTag;
