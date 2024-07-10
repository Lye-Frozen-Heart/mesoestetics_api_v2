"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const register_1 = __importDefault(require("./register"));
const deleteUser_1 = __importDefault(require("./deleteUser"));
const getAllUsers_1 = __importDefault(require("./getAllUsers"));
const updateUser_1 = __importDefault(require("./updateUser"));
const getUser_1 = __importDefault(require("./getUser"));
const login_1 = __importDefault(require("./login"));
const UsersController = (repository) => ({
    getAllUsers: (0, getAllUsers_1.default)(repository),
    login: (0, login_1.default)(repository), //Login y es un POST
    register: (0, register_1.default)(repository), //Register y es un POST
    updateUser: (0, updateUser_1.default)(repository),
    deleteUser: (0, deleteUser_1.default)(repository),
    getUser: (0, getUser_1.default)(repository),
});
exports.default = UsersController;
