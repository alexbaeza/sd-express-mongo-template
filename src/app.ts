import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Controller } from "./controllers/main";
import mongoose from "mongoose";
import { MONGODB_CONNECTION_STRING } from "./constants/config";

class App {
  public app: Application;
  public mainController: Controller;

  constructor() {
    this.app = express();
    this.setConfig();
    this.setMongoConfig();
    this.mainController = new Controller(this.app);
  }

  //Connecting to our MongoDB database
  private setMongoConfig() {
    mongoose.Promise = global.Promise;
    mongoose.connect(MONGODB_CONNECTION_STRING, {
      useNewUrlParser: true
    });
  }

  private setConfig() {
    //Allows receiving requests with data in json format
    this.app.use(bodyParser.json({ limit: '10mb' }));

    //Allows receiving requests with data in x-www-form-urlencoded format
    this.app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

    //Enables cors
    this.app.use(cors());
  }
}

export default new App().app;
