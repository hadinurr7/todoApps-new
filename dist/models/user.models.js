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
exports.createUser = exports.findUserByEmail = void 0;
const config_1 = require("../config");
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield config_1.pool.query('SELECT * FROM "todoApps"."users" WHERE email = $1', [email]);
    return result.rows[0];
});
exports.findUserByEmail = findUserByEmail;
const createUser = (name, email, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield config_1.pool.query('INSERT INTO "todoApps"."users" (name, email, password) VALUES ($1, $2, $3) RETURNING *', [name, email, hashedPassword]);
    return result.rows[0];
});
exports.createUser = createUser;
