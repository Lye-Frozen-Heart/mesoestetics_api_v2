"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = void 0;
function validateUser(user) {
    if (typeof user !== "object" || user === null)
        return false;
    const { username, password } = user;
    return typeof username === "string" && typeof password === "string";
}
exports.validateUser = validateUser;
