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
exports.registerUser = registerUser;
exports.loginUser = loginUser;
const argon2_1 = __importDefault(require("argon2"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_models_1 = require("../models/user.models");
const JWT_SECRET = process.env.JWT_SECRET || "default_secret";
function registerUser(name, email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const existing = yield (0, user_models_1.findUserByEmail)(email);
        if (existing)
            throw new Error("Email already registered");
        const hashedPassword = yield argon2_1.default.hash(password);
        yield (0, user_models_1.createUser)(name, email, hashedPassword);
        return { message: "Register success" };
    });
}
function loginUser(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield (0, user_models_1.findUserByEmail)(email);
        if (!user)
            throw new Error("User not found");
        const isValid = yield argon2_1.default.verify(user.password, password);
        if (!isValid)
            throw new Error("Invalid credentials");
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });
        return { message: "Login success", token };
    });
}
