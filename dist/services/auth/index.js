"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controllers = __importStar(require("./controllers"));
const index_1 = require("../index");
const joi_1 = __importDefault(require("joi"));
const types_1 = require("../../types");
exports.default = index_1.createService({
    name: "인증 서비스",
    baseURL: "/auth",
    routes: [
        {
            method: "post",
            path: "/register",
            handler: controllers.registerUser,
            validateSchema: {
                idx: joi_1.default.number().required(),
                username: joi_1.default.string().required(),
                name: joi_1.default.string().required(),
                userType: joi_1.default.string()
                    .valid(...types_1.UserTypeValues)
                    .required(),
            },
            needAuth: false,
            needPermission: false,
        },
        {
            method: "post",
            path: "/",
            handler: controllers.identifyUser,
            needAuth: false,
            needPermission: false,
        },
    ],
});
//# sourceMappingURL=index.js.map