"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const user_router_1 = __importDefault(require("./routes/user.router"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/", user_router_1.default);
// app.use("/", todoRouter);
app.use((err, req, res, next) => {
    res.status(400).json({ message: err.message });
});
app.listen(config_1.PORT, () => {
    console.log(`Server running on port ${config_1.PORT}`);
});
