"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
const types_1 = require("../types");
const userSchema = new mongoose_1.Schema({
    idx: { type: Number, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    userType: { type: String, enum: types_1.UserTypeValues, required: true },
}, { timestamps: true });
exports.userSchema = userSchema;
const UserModel = mongoose_1.model('User', userSchema);
exports.UserModel = UserModel;
//# sourceMappingURL=user.js.map