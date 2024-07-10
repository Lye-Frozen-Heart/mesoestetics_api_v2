"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UsersController_1 = __importDefault(require("../controllers/UsersController"));
const createUsersRouter = (repository) => {
    const usersRouter = (0, express_1.Router)();
    const usersController = (0, UsersController_1.default)(repository);
    usersRouter.get("/", usersController.getAllUsers);
    usersRouter.get("/:id", usersController.getUser);
    usersRouter.post("/login", usersController.login);
    usersRouter.post("/register", usersController.register);
    usersRouter.put("/:id", usersController.updateUser);
    usersRouter.delete("/:id", usersController.deleteUser);
    return usersRouter;
};
const usersRouterIoC = (app, repository) => {
    const usersRouter = createUsersRouter(repository);
    app.use("/users", usersRouter);
};
exports.default = usersRouterIoC;
