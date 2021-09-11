"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const token_1 = require("../resources/token");
const attachIdentity = async (req, Res, next) => {
    if (!req.token) {
        return next();
    }
    const { token } = req;
    try {
        const identity = await token_1.veriToken(token);
        req.user = identity;
        next();
    }
    catch (e) {
        return next(e);
    }
};
exports.default = attachIdentity;
//# sourceMappingURL=user-identity.js.map