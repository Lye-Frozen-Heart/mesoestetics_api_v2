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
Object.defineProperty(exports, "__esModule", { value: true });
const userMapper_1 = require("../validators/userMapper");
const register = (repository) => {
    return (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = req.body;
        const userIsValid = (0, userMapper_1.validateUser)(user);
        if (!userIsValid)
            return res.status(400).json({ error: "Missing data..." });
        const response = yield repository.register(user);
        if (response === null) {
            return res
                .status(409)
                .json({ ok: false, msg: "User couldn't be created" });
        }
        return res
            .status(201)
            .json({ ok: true, msg: "User created successfully!" });
    });
};
exports.default = register;
