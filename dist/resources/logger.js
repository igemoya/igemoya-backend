"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpLogStream = exports.logger = void 0;
const winston_1 = __importDefault(require("winston"));
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
// import { sendTGMessage } from './telegram';
const logDir = "logs";
const { combine, timestamp, printf } = winston_1.default.format;
const logFormat = printf((info) => `${info.timestamp} ${info.level}: ${info.message}`);
const logger = winston_1.default.createLogger({
    format: combine(timestamp({
        format: "YYYY-MM-DD HH:mm:ss",
    }), logFormat),
    transports: [
        new winston_daily_rotate_file_1.default({
            level: "http",
            datePattern: "YYYY-MM-DD",
            dirname: logDir,
            filename: "%DATE%.log",
            maxFiles: 30,
            zippedArchive: true,
        }),
        new winston_daily_rotate_file_1.default({
            level: "error",
            datePattern: "YYYY-MM-DD",
            dirname: `${logDir}/error`,
            filename: "%DATE%.error.log",
            maxFiles: 30,
            zippedArchive: true,
        }),
    ],
});
exports.logger = logger;
if (process.env.NODE_ENV !== undefined) {
    //텔그 봇 문제있어서 죽임 process.env.NODE_ENV !== dev
    logger.add(new winston_1.default.transports.Console({
        format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.simple()),
    }));
}
else {
    logger.on("data", ({ level, message, timestamp: time }) => {
        if (!message.startsWith("[HttpException]") && level < 2) {
            // sendTGMessage(`[${level}] ${message} (${time})`);
        }
    });
}
const httpLogStream = {
    write: (message) => {
        logger.http(message);
    },
};
exports.httpLogStream = httpLogStream;
//# sourceMappingURL=logger.js.map