"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageMetaSchema = exports.imageMetaModel = void 0;
const mongoose_1 = require("mongoose");
const mongodb_1 = require("mongodb");
const types_1 = require("../types");
const config_1 = __importDefault(require("../config"));
const imageMetaSchema = new mongoose_1.Schema({
    uploader: { type: mongodb_1.ObjectId, required: true, ref: "User" },
    filename: { type: String, required: true },
    location: {
        coordinate: { type: Array, required: true },
        type: { type: String, enum: types_1.exhibitionGeoTypeValues },
    },
    createdAt: {
        type: Date,
        expires: parseInt(config_1.default.logExpires),
        default: Date.now,
    },
});
exports.imageMetaSchema = imageMetaSchema;
const imageMetaModel = mongoose_1.model("ImageMeta", imageMetaSchema);
exports.imageMetaModel = imageMetaModel;
//# sourceMappingURL=image.js.map