"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_bearer_token_1 = __importDefault(require("express-bearer-token"));
const mongoose_1 = __importDefault(require("mongoose"));
const morgan_1 = __importDefault(require("morgan"));
const config_1 = __importDefault(require("./config"));
const logger_1 = require("./resources/logger");
const services_1 = require("./services");
const middlewares_1 = require("./middlewares");
class App {
    constructor() {
        this.app = express_1.default();
        this.connectMongoDB();
        this.initializeMiddlewares();
        this.initializeMorgan();
        this.initializeRouter();
    }
    initializeRouter() {
        this.app.use("/", services_1.serviceRouter);
        this.app.use("/docs", services_1.serviceDocsRouter);
    }
    initializeMiddlewares() {
        this.app.use(express_1.default.json());
        this.app.use(middlewares_1.attachIdentity);
        this.app.use(express_bearer_token_1.default({
            headerKey: "Bearer",
            reqKey: "token",
        }));
    }
    connectMongoDB() {
        const { mongoURI } = config_1.default;
        const mongooseOption = {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
            useCreateIndex: true,
        };
        mongoose_1.default.connect(mongoURI, mongooseOption).then(() => {
            //mongoose@^5.13.5에서 정상작동
            logger_1.logger.info(`MongoDB connected`);
        });
    }
    initializeMorgan() {
        const morganFormat = `HTTP/:http-version :method :remote-addr 
      :url :remote-user :status :res[content-length] 
      :referrer :user-agent :response-time ms`;
        this.app.use(morgan_1.default(morganFormat, { stream: logger_1.httpLogStream }));
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map