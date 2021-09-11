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
const middlewares_1 = require("../../middlewares");
exports.default = index_1.createService({
    name: "exhibitions",
    baseURL: "/superviser",
    routes: [
        {
            method: "get",
            path: "/exhibition",
            handler: controllers.getAllExhibitions,
            middlewares: [middlewares_1.attachIdentity],
            needAuth: true,
            needPermission: true,
        },
        {
            method: "get",
            path: "/item/:id",
            handler: controllers.getAllItems,
            middlewares: [middlewares_1.attachIdentity],
            needAuth: true,
            needPermission: true,
        },
        {
            method: "get",
            path: "/object/:id",
            handler: controllers.getAllObjects,
            middlewares: [middlewares_1.attachIdentity],
            needAuth: true,
            needPermission: true,
        },
        // 3Depth POST
        {
            method: "post",
            path: "/exhibition",
            handler: controllers.registerExhibition,
            middlewares: [middlewares_1.attachIdentity],
            needAuth: true,
            needPermission: true,
        },
        {
            method: "post",
            path: "/item",
            handler: controllers.registerItems,
            middlewares: [middlewares_1.attachIdentity],
            needAuth: true,
            needPermission: true,
        },
        {
            method: "post",
            path: "/object",
            handler: controllers.registerObjects,
            middlewares: [middlewares_1.attachIdentity],
            needAuth: true,
            needPermission: true,
        },
        //3Depth PUT
        {
            method: "put",
            path: "/exhibition",
            handler: controllers.updateExhibition,
            middlewares: [middlewares_1.attachIdentity],
            needAuth: true,
            needPermission: true,
        },
        {
            method: "put",
            path: "/item",
            handler: controllers.updateItem,
            middlewares: [middlewares_1.attachIdentity],
            needAuth: true,
            needPermission: true,
        },
        {
            method: "put",
            path: "/object",
            handler: controllers.updateObject,
            middlewares: [middlewares_1.attachIdentity],
            needAuth: true,
            needPermission: true,
        },
        //3Depth Delete
        {
            method: "delete",
            path: "/exhibition/:id",
            handler: controllers.deleteExhibition,
            middlewares: [middlewares_1.attachIdentity],
            needAuth: true,
            needPermission: true,
        },
        {
            method: "delete",
            path: "/item/:id",
            handler: controllers.deleteItem,
            middlewares: [middlewares_1.attachIdentity],
            needAuth: true,
            needPermission: true,
        },
        {
            method: "delete",
            path: "/object/:id",
            handler: controllers.deleteObject,
            middlewares: [middlewares_1.attachIdentity],
            needAuth: true,
            needPermission: true,
        },
    ],
});
//# sourceMappingURL=index.js.map