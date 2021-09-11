"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = exports.identifyUser = void 0;
const exceptions_1 = require("../../exceptions");
const models_1 = require("../../models");
const token_1 = require("../../resources/token");
const identifyUser = async (req, res) => {
    const account = req.body;
    try {
        const identity = await models_1.UserModel.findOne({
            idx: account.idx,
        });
        if (!identity) {
            throw new Error("HttpException");
        }
        return res.json({ token: await token_1.issueToken(identity) });
    }
    catch (e) {
        if (e.name === "HttpException")
            throw e;
        throw new exceptions_1.HttpException(401, "인증에 실패했습니다.");
    }
};
exports.identifyUser = identifyUser;
const registerUser = async (req, res) => {
    const userInfo = req.body;
    try {
        const userData = new models_1.UserModel(userInfo);
        return res.json({ token: await token_1.issueToken(await userData.save()) });
    }
    catch (e) {
        if (e.name === "HttpException")
            throw e;
        throw new exceptions_1.HttpException(401, "회원가입에 실패했습니다.");
    }
};
exports.registerUser = registerUser;
//# sourceMappingURL=controllers.js.map