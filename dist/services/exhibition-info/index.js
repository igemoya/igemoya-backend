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
Object.defineProperty(exports, "__esModule", { value: true });
const controllers = __importStar(require("./controllers"));
const index_1 = require("../index");
exports.default = index_1.createService({
    name: "전시 정보 조회",
    baseURL: "/exhibition-info",
    routes: [
        {
            method: "get",
            path: "/exhibition/:id",
            handler: controllers.getExhibition,
            needAuth: false,
            needPermission: false,
        },
        {
            method: "get",
            path: "/item/:id",
            handler: controllers.getItem,
            needAuth: false,
            needPermission: false,
        },
        {
            method: "get",
            path: "/object/:id",
            handler: controllers.getObject,
            needAuth: false,
            needPermission: false,
        },
    ],
});
//# sourceMappingURL=index.js.map