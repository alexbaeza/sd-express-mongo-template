import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Application } from 'express';
import { MONGODB_CONNECTION_STRING } from './constants/config';
import { Controller } from './controllers/main';
import * as dbHelper from './helpers/db-helper';

const environment: string = process.env.NODE_ENV;

class App {
  public app: Application;
  public mainController: Controller;

  constructor() {
    this.app = express();
    this.setConfig();
    this.setMongoConfig();
    this.mainController = new Controller(this.app);
  }

  // Connecting to our MongoDB database
  private setMongoConfig() {
    if (environment !== 'test') {
      // tslint:disable-next-line:no-floating-promises
      dbHelper.connect(MONGODB_CONNECTION_STRING);
    }
  }

  private setConfig() {
    // Allows receiving requests with data in json format
    this.app.use(bodyParser.json({ limit: '10mb' }));

    // Allows receiving requests with data in x-www-form-urlencoded format
    this.app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

    // Enables cors
    this.app.use(cors());
  }
}

export default new App().app;
