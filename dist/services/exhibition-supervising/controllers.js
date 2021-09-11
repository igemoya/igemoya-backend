"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteObject = exports.deleteItem = exports.deleteExhibition = exports.getAllObjects = exports.getAllItems = exports.getAllExhibitions = exports.updateObject = exports.updateItem = exports.updateExhibition = exports.registerObjects = exports.registerItems = exports.registerExhibition = void 0;
const exceptions_1 = require("../../exceptions");
const models_1 = require("../../models");
const mongodb_1 = require("mongodb");
const types_1 = require("../../types");
const registerExhibition = async (req, res) => {
    try {
        const exhibition = req.body;
        exhibition.createdUser = req.user._id;
        const newExhibition = new models_1.exhibitionModel(exhibition);
        await newExhibition.save();
        return res.sendStatus(types_1.HttpStatus.Created);
    }
    catch (e) {
        if (e.name === "HttpException")
            throw e;
        throw new exceptions_1.HttpException(types_1.HttpStatus.BadRequest, "전시 등록에 실패했습니다.");
    }
};
exports.registerExhibition = registerExhibition;
const registerItems = async (req, res) => {
    try {
        const item = req.body;
        const exhibition = await models_1.exhibitionModel.findOne({
            _id: req.body.exhibitionId,
        });
        if (exhibition.createdUser != req.user._id) {
            //전시를 등록한 사용자와 현재 접근하는 사용자가 같은지 검증
            throw new exceptions_1.HttpException(types_1.HttpStatus.Unauthorized, "해당 전시를 수정하기 위해 필요한 권한이 없습니다.");
        }
        item.createdUser = exhibition.createdUser;
        new models_1.itemModel(item).save();
        res.sendStatus(types_1.HttpStatus.Created);
    }
    catch (e) {
        if (e.name === "HttpException")
            throw e;
        throw new exceptions_1.HttpException(types_1.HttpStatus.BadRequest, "전시 조회에 실패했습니다.");
    }
};
exports.registerItems = registerItems;
const registerObjects = async (req, res) => {
    try {
        const object = req.body;
        const item = await models_1.itemModel.findOne({
            _id: req.body.itemId,
        });
        if (item.createdUser != req.user._id) {
            //전시를 등록한 사용자와 현재 접근하는 사용자가 같은지 검증
            throw new exceptions_1.HttpException(types_1.HttpStatus.Unauthorized, "해당 전시를 수정하기 위해 필요한 권한이 없습니다.");
        }
        object.createdUser = req.user._id;
        new models_1.objectModel(object).save();
        res.sendStatus(types_1.HttpStatus.Created);
    }
    catch (e) {
        if (e.name === "HttpException")
            throw e;
        throw new exceptions_1.HttpException(types_1.HttpStatus.NotFound, "오브젝트 등록에 실패했습니다.");
    }
};
exports.registerObjects = registerObjects;
const updateExhibition = async (req, res) => {
    try {
        const exhibition = await models_1.exhibitionModel.findOne({
            _id: req.body.exhibitionId,
        });
        if (exhibition.createdUser != req.user._id) {
            //전시를 등록한 사용자와 현재 접근하는 사용자가 같은지 검증
            throw new exceptions_1.HttpException(types_1.HttpStatus.Unauthorized, "해당 전시를 수정하기 위해 필요한 권한이 없습니다.");
        }
        await models_1.exhibitionModel.updateOne({ _id: req.body.exhibitionId }, req.body.exhibition);
        res.sendStatus(types_1.HttpStatus.OK);
    }
    catch (e) {
        if (e.name === "HttpException")
            throw e;
        throw new exceptions_1.HttpException(types_1.HttpStatus.BadRequest, "전시 수정에 실패했습니다.");
    }
};
exports.updateExhibition = updateExhibition;
const updateItem = async (req, res) => {
    try {
        const item = await models_1.itemModel.findOne({
            _id: req.body.exhibitionId,
        });
        if (item.createdUser != req.user._id) {
            //전시를 등록한 사용자와 현재 접근하는 사용자가 같은지 검증
            throw new exceptions_1.HttpException(types_1.HttpStatus.Unauthorized, "해당 아이템을 수정하기 위해 필요한 권한이 없습니다.");
        }
        await models_1.itemModel.updateOne({ _id: req.body.itemId }, req.body.item);
        res.sendStatus(types_1.HttpStatus.OK);
    }
    catch (e) {
        if (e.name === "HttpException")
            throw e;
        throw new exceptions_1.HttpException(types_1.HttpStatus.BadRequest, "아이템 수정에 실패했습니다.");
    }
};
exports.updateItem = updateItem;
const updateObject = async (req, res) => {
    try {
        const item = await models_1.objectModel.findOne({
            _id: req.body.objectId,
        });
        if (item.createdUser != req.user._id) {
            //전시를 등록한 사용자와 현재 접근하는 사용자가 같은지 검증
            throw new exceptions_1.HttpException(types_1.HttpStatus.Unauthorized, "해당 오브젝트를 수정하기 위해 필요한 권한이 없습니다.");
        }
        await models_1.objectModel.updateOne({ _id: req.body.objectId }, req.body.object);
        res.sendStatus(types_1.HttpStatus.OK);
    }
    catch (e) {
        if (e.name === "HttpException")
            throw e;
        throw new exceptions_1.HttpException(types_1.HttpStatus.BadRequest, "오브젝트 수정에 실패했습니다.");
    }
};
exports.updateObject = updateObject;
const getAllExhibitions = async (req, res) => {
    try {
        const exhibitions = await models_1.exhibitionModel.find({
            createdUser: req.user._id,
        });
        return res.json({ exhibitions: exhibitions });
    }
    catch (e) {
        if (e.name === "HttpException")
            throw e;
        throw new exceptions_1.HttpException(types_1.HttpStatus.BadRequest, "전시 조회에 실패했습니다.");
    }
};
exports.getAllExhibitions = getAllExhibitions;
const getAllItems = async (req, res) => {
    try {
        const items = await models_1.itemModel.aggregate([
            {
                $match: {
                    $and: [
                        { createdUser: new mongodb_1.ObjectId(req.user._id) },
                        { exhibitionId: new mongodb_1.ObjectId(req.params.id) },
                    ],
                },
            },
        ]);
        return res.json({ items: items });
    }
    catch (e) {
        if (e.name === "HttpException")
            throw e;
        throw new exceptions_1.HttpException(types_1.HttpStatus.BadRequest, "아이템 조회에 실패했습니다.");
    }
};
exports.getAllItems = getAllItems;
const getAllObjects = async (req, res) => {
    try {
        const objects = await models_1.objectModel.aggregate([
            {
                $match: {
                    $and: [
                        { createdUser: new mongodb_1.ObjectId(req.user._id) },
                        { itemId: new mongodb_1.ObjectId(req.params.id) },
                    ],
                },
            },
        ]);
        return res.json({ objects: objects });
    }
    catch (e) {
        if (e.name === "HttpException")
            throw e;
        throw new exceptions_1.HttpException(types_1.HttpStatus.BadRequest, "오브젝트 조회에 실패했습니다.");
    }
};
exports.getAllObjects = getAllObjects;
const deleteExhibition = async (req, res) => {
    try {
        const exhibition = await models_1.exhibitionModel.findOne({
            _id: req.params.id,
        });
        if (exhibition.createdUser != req.user._id) {
            //전시를 등록한 사용자와 현재 접근하는 사용자가 같은지 검증
            throw new exceptions_1.HttpException(types_1.HttpStatus.Unauthorized, "해당 전시를 수정하기 위해 필요한 권한이 없습니다.");
        }
        res.sendStatus(types_1.HttpStatus.OK);
    }
    catch (e) {
        if (e.name === "HttpException")
            throw e;
        throw new exceptions_1.HttpException(types_1.HttpStatus.BadRequest, "전시 삭제에 실패했습니다.");
    }
};
exports.deleteExhibition = deleteExhibition;
const deleteItem = async (req, res) => {
    try {
        const item = await models_1.itemModel.findOne({
            _id: req.params.id,
        });
        if (item.createdUser != req.user._id) {
            //전시를 등록한 사용자와 현재 접근하는 사용자가 같은지 검증
            throw new exceptions_1.HttpException(types_1.HttpStatus.Unauthorized, "해당 아이템을 수정하기 위해 필요한 권한이 없습니다.");
        }
        await models_1.itemModel.deleteOne({ _id: req.params.id });
        res.sendStatus(types_1.HttpStatus.OK);
    }
    catch (e) {
        if (e.name === "HttpException")
            throw e;
        throw new exceptions_1.HttpException(types_1.HttpStatus.BadRequest, "아이템 삭제에 실패했습니다.");
    }
};
exports.deleteItem = deleteItem;
const deleteObject = async (req, res) => {
    try {
        const item = await models_1.objectModel.findOne({
            _id: req.params.id,
        });
        if (item.createdUser != req.user._id) {
            //전시를 등록한 사용자와 현재 접근하는 사용자가 같은지 검증
            throw new exceptions_1.HttpException(types_1.HttpStatus.Unauthorized, "해당 오브젝트를 수정하기 위해 필요한 권한이 없습니다.");
        }
        await models_1.objectModel.deleteOne({ _id: req.params.id });
        res.sendStatus(types_1.HttpStatus.OK);
    }
    catch (e) {
        if (e.name === "HttpException")
            throw e;
        throw new exceptions_1.HttpException(types_1.HttpStatus.BadRequest, "오브젝트 삭제에 실패했습니다.");
    }
};
exports.deleteObject = deleteObject;
//# sourceMappingURL=controllers.js.map