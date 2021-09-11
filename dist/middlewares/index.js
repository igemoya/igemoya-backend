"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validator = exports.recombineCoord = exports.checkPermissions = exports.attachIdentity = void 0;
var user_identity_1 = require("./user-identity");
Object.defineProperty(exports, "attachIdentity", { enumerable: true, get: function () { return __importDefault(user_identity_1).default; } });
var check_permissions_1 = require("./check-permissions");
Object.defineProperty(exports, "checkPermissions", { enumerable: true, get: function () { return __importDefault(check_permissions_1).default; } });
var recombine_coord_1 = require("./recombine-coord");
Object.defineProperty(exports, "recombineCoord", { enumerable: true, get: function () { return __importDefault(recombine_coord_1).default; } });
var validator_1 = require("./validator");
Object.defineProperty(exports, "validator", { enumerable: true, get: function () { return __importDefault(validator_1).default; } });
//# sourceMappingURL=index.js.map