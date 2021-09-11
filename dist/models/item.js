"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemModel = exports.itemSchema = void 0;
const mongoose_1 = require("mongoose");
const mongodb_1 = require("mongodb");
const types_1 = require("../types");
const itemSchema = new mongoose_1.Schema({
    exhibitionId: { type: mongodb_1.ObjectId, ref: "Exhibition" },
    createdUser: { type: mongodb_1.ObjectId, ref: "User" },
    name: { type: String, required: true },
    description: { type: String, required: true },
    images: { type: Array, required: true },
    location: {
        coordinate: { type: Array, required: true },
        type: { type: String, enum: types_1.exhibitionGeoTypeValues },
    },
}, { timestamps: true });
exports.itemSchema = itemSchema;
const itemModel = mongoose_1.model("Item", itemSchema);
exports.itemModel = itemModel;
//# sourceMappingURL=item.js.map