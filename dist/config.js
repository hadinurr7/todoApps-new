"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = exports.JWT_SECRET = exports.PORT = void 0;
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.PORT = process.env.PORT;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
});
