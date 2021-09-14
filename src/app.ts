import express from "express";
import bearerToken from "express-bearer-token";
import mongoose from "mongoose";
import morgan from "morgan";
import favicon from "serve-favicon";
import path from "path";
import cors from "cors";
import config from "./config";
import { httpLogStream, logger } from "./resources/logger";
import { serviceDocsRouter, serviceRouter } from "./services";
import { attachIdentity } from "./middlewares";

class App {
  public app: express.Application;
  constructor() {
    this.app = express();
    this.connectMongoDB();
    this.initializeMorgan();
    this.initializeMiddlewares();
    this.initializeRouter();
  }
  private initializeRouter() {
    this.app.use("/", serviceRouter);
    this.app.use("/docs", serviceDocsRouter);
  }
  private initializeMiddlewares() {
    this.app.use(
      bearerToken({
        headerKey: "Bearer",
        reqKey: "token",
      })
    );
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(favicon(path.join(__dirname, "favicon", "favicon.ico")));
  }
  private connectMongoDB() {
    const { mongoURI } = config;
    const mongooseOption = {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true,
    };
    mongoose.connect(mongoURI, mongooseOption).then(() => {
      //mongoose@^5.13.5에서 정상작동
      logger.info(`MongoDB connected`);
    });
  }
  private initializeMorgan() {
    const morganFormat = `HTTP/:http-version :method :remote-addr 
      :url :remote-user :status :res[content-length] 
      :referrer :user-agent :response-time ms`;

    this.app.use(morgan(morganFormat, { stream: httpLogStream }));
  }
}
export default App;
