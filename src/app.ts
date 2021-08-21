import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';

import config from './config';
import { httpLogStream, logger } from './resources/logger';
import { serviceRouter } from './services'

class App {
    public app : express.Application;
    constructor(){
      this.app = express();
      this.connectMongoDB();
      this.initializeMiddlewares();
      this.initializeMorgan();
      this.initializeRouter();
    }
    private initializeRouter() {
      this.app.use('/', serviceRouter);
    }
    private initializeMiddlewares() {
      this.app.use(express.json());
    }
    private connectMongoDB() {
      const { mongoURI } = config;
      const mongooseOption = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      };
      mongoose.connect(mongoURI, mongooseOption)
        .then(() => {
          logger.info(`MongoDB connected`);
        });
    }
    private initializeMorgan() {
      const morganFormat =
      `HTTP/:http-version :method :remote-addr 
      :url :remote-user :status :res[content-length] 
      :referrer :user-agent :response-time ms`;

      this.app.use(morgan(morganFormat, { stream: httpLogStream }));
    }
  }
export default App;