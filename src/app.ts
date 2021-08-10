import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';

import config from './config';
import { httpLogStream } from './resources/logger'

class App {
    public app : express.Application;
    constructor(){
      this.app = express();
      this.connectMongoDB();
    }

    private connectMongoDB() {
      const { mongoURI } = config;
      const mongooseOption = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      };
      mongoose.connect(mongoURI, mongooseOption)
    }
    private initializeMorgan() {
      const logFormat = 
      `HTTP/:http-version :method :remote-addr 
      :url :remote-user :status :res[content-length] 
      :referrer :user-agent :response-time ms`

      this.app.use(morgan(logFormat, { stream: httpLogStream }));
    }
  }
export default App;