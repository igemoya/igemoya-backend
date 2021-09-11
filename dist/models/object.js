"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectSchema = exports.objectModel = void 0;
const mongoose_1 = require("mongoose");
const mongodb_1 = require("mongodb");
const objectSchema = new mongoose_1.Schema({
    itemId: { type: mongodb_1.ObjectId, ref: "Item" },
    createdUser: { type: mongodb_1.ObjectId, ref: "User" },
    name: { type: String, required: true },
    description: { type: String, required: true },
    images: { type: Array, required: true },
}, { timestamps: true });
exports.objectSchema = objectSchema;
const objectModel = mongoose_1.model("Objects", objectSchema);
exports.objectModel = objectModel;
//# sourceMappingURL=object.js.map