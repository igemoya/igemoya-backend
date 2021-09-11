"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceDocsRouter = exports.serviceRouter = exports.importedServices = exports.services = exports.createService = void 0;
const fs_1 = __importDefault(require("fs"));
const joi_1 = __importDefault(require("joi"));
const express_1 = require("express");
const path_1 = require("path");
const middlewares_1 = require("../middlewares");
const wrapper = (asyncFn) => async (req, res, next) => {
    try {
        return await asyncFn(req, res, next);
    }
    catch (error) {
        return next(error);
    }
};
const createService = (serviceSchema) => serviceSchema;
exports.createService = createService;
const createRouter = (services) => {
    const router = express_1.Router();
    services.forEach((service) => {
        service.routes.forEach((route) => {
            router[route.method](path_1.join(service.baseURL, route.path), ...(route.middlewares ? route.middlewares.map(wrapper) : []), wrapper(middlewares_1.recombineCoord), wrapper(middlewares_1.checkPermissions(service.code, route)), ...(route.validateSchema
                ? [middlewares_1.validator(joi_1.default.object(route.validateSchema))]
                : []), wrapper(route.handler));
        });
    });
    return router;
};
const createDocsRouter = (services) => {
    const router = express_1.Router();
    const schemaMapper = (validateSchema) => {
        const keys = Object.keys(validateSchema);
        const result = {};
        keys.forEach((key) => {
            result[key] = validateSchema[key].type;
        });
        return result;
    };
    const routeMapper = (service) => service.routes.map((r) => ({
        ...r,
        path: (service.baseURL + r.path).replace(/\/$/, ""),
        validateSchema: r.validateSchema ? schemaMapper(r.validateSchema) : {},
    }));
    const mappedServices = services.map((s) => ({
        ...s,
        routes: routeMapper(s),
    }));
    router.get("/", (req, res) => {
        res.json({ services: mappedServices });
    });
    return router;
};
exports.services = fs_1.default
    .readdirSync(__dirname)
    .filter((s) => !s.startsWith("index"));
exports.importedServices = exports.services.map((s) => ({
    code: s,
    // eslint-disable-next-line
    ...require(`${__dirname}/${s}`).default,
}));
exports.serviceRouter = createRouter(exports.importedServices);
exports.serviceDocsRouter = createDocsRouter(exports.importedServices);
//# sourceMappingURL=index.js.map