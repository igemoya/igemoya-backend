"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exhibitionModel = exports.exhibitionSchema = void 0;
const mongoose_1 = require("mongoose");
const mongodb_1 = require("mongodb");
const types_1 = require("../types");
const exhibitionSchema = new mongoose_1.Schema({
    createdUser: { type: mongodb_1.ObjectId, ref: "User" },
    name: { type: String, required: true },
    description: { type: String, required: true },
    images: { type: Array, required: true },
    location: {
        coordinate: { type: Array, required: true },
        type: { type: String, enum: types_1.exhibitionGeoTypeValues },
    },
});
exports.exhibitionSchema = exhibitionSchema;
const exhibitionModel = mongoose_1.model("Exhibitions", exhibitionSchema);
exports.exhibitionModel = exhibitionModel;
//# sourceMappingURL=exhibition.js.map