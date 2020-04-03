import { Application } from 'express';
import { ExampleService } from "../services/example-service";
import { PATHS } from "../constants/paths";

export class Controller {
  private exampleService: ExampleService;

  constructor(private app: Application) {
    this.exampleService = new ExampleService();
    this.routes();
  }

  public routes() {
    this.app.route(PATHS.INDEX)
      .get(this.exampleService.welcomeMessage);

    this.app.route(PATHS.ALL)
      .get(this.exampleService.getAllExampleItems);

    this.app.route(PATHS.ITEM)
      .post(this.exampleService.addNewExampleItem);

    this.app.route(PATHS.ITEM_BY_ID)
      .get(this.exampleService.getExampleItem)
      .delete(this.exampleService.deleteExampleItem)
      .put(this.exampleService.updateExampleItem);

  }
}
