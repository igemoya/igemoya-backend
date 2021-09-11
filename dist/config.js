"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const env = dotenv_1.default.config();
if (!env)
    throw new Error(".env file not exist");
exports.default = {
    port: process.env.SERVER_PORT,
    telegramToken: process.env.TELEGRAM_TOKEN,
    telegramChatID: process.env.TELEGRAM_CHATID,
    mongoURI: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET,
    logExpires: process.env.LOG_EXPIRES,
};
//# sourceMappingURL=config.js.map