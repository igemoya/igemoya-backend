"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpException = void 0;
const logger_1 = require("../resources/logger");
class HttpException extends Error {
    constructor(status = 500, message = "알 수 없는 서버 오류가 발생했습니다.") {
        super(message);
        this.name = "HttpException";
        this.status = status;
        this.message = message;
        logger_1.logger.error(`${this.name}: ${this.status} ${this.message}`);
    }
}
exports.HttpException = HttpException;
//# sourceMappingURL=index.js.map