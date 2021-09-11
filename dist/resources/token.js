"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.veriToken = exports.issueToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const exceptions_1 = require("../exceptions");
const issueToken = async (payload, expires = "1w" //number인 경우 단위는 second, string은 days, w, h, m, d 등등
) => {
    const token = await jsonwebtoken_1.default.sign({
        payload,
    }, config_1.default.jwtSecret, {
        algorithm: "HS512",
        expiresIn: expires,
    });
    return token;
};
exports.issueToken = issueToken;
const veriToken = async (token) => {
    try {
        const { payload } = await jsonwebtoken_1.default.verify(token, config_1.default.jwtSecret);
        return payload;
    }
    catch (e) {
        if (e.name === "TokenExpiredError") {
            throw new exceptions_1.HttpException(401, "토큰이 만료되었습니다.");
        }
        else if (["jwt malformed", "invalid signature"].includes(e.message)) {
            throw new exceptions_1.HttpException(401, "토큰이 변조되었습니다.");
        }
        else
            throw new exceptions_1.HttpException(401, "토큰에 문제가 있습니다.");
    }
};
exports.veriToken = veriToken;
//# sourceMappingURL=token.js.map