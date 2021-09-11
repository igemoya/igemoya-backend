"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getObject = exports.getItem = exports.getExhibition = void 0;
const exceptions_1 = require("../../exceptions");
const models_1 = require("../../models");
const types_1 = require("../../types");
const getExhibition = async (req, res) => {
    try {
        const exhibition = await models_1.exhibitionModel.findById(req.params.id);
        return res.json({ exhibition: exhibition });
    }
    catch (e) {
        if (e.name === "HttpException")
            throw e;
        throw new exceptions_1.HttpException(types_1.HttpStatus.BadRequest, "전시 조회에 실패했습니다.");
    }
};
exports.getExhibition = getExhibition;
const getItem = async (req, res) => {
    try {
        const item = await models_1.itemModel.findById(req.params.id);
        return res.json({ item: item });
    }
    catch (e) {
        if (e.name === "HttpException")
            throw e;
        throw new exceptions_1.HttpException(types_1.HttpStatus.BadRequest, "아이템 조회에 실패했습니다.");
    }
};
exports.getItem = getItem;
const getObject = async (req, res) => {
    try {
        const object = await models_1.objectModel.findById(req.params.id);
        return res.json({ object: object });
    }
    catch (e) {
        if (e.name === "HttpException")
            throw e;
        throw new exceptions_1.HttpException(types_1.HttpStatus.BadRequest, "오브젝트 조회에 실패했습니다.");
    }
};
exports.getObject = getObject;
//# sourceMappingURL=controllers.js.map