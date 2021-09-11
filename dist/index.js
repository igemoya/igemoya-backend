"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config"));
const logger_1 = require("./resources/logger");
dotenv_1.default.config();
const { app } = new app_1.default();
const port = parseInt(config_1.default.port) || 5000;
app.listen(port, () => {
    logger_1.logger.info(`Server listening on ${port}`);
});
//# sourceMappingURL=index.js.map