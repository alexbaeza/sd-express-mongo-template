import { Request, Response } from "express";
import { DELETE_SUCCESSFUL_MESSAGE, RESOURCE_NOT_FOUND_MESSAGE, WELCOME_MESSAGE } from "../constants/messages";
import { MongooseDocument } from "mongoose";
import { ExampleModel } from "../models/example";

export class ExampleService {
  public welcomeMessage(req: Request, res: Response) {
    return res.status(200).send(WELCOME_MESSAGE);
  }

  public getAllExampleItems(req: Request, res: Response) {
    ExampleModel.find({}, (error: Error, exampleItem: MongooseDocument) => {
      if (error) {
        return res.send(error);
      }
      return res.json(exampleItem);
    });
  }

  public addNewExampleItem(req: Request, res: Response) {
    const newExampleItem = new ExampleModel(req.body);
    newExampleItem.save((error: Error, exampleItem: MongooseDocument) => {
      if (error) {
        return res.send(error);
      }
      return res.status(201).json(exampleItem);
    });
  }

  public deleteExampleItem(req: Request, res: Response) {
    const exampleItemId = req.params.id;
    //findOneAndDelete({_id: exampleItemId}).
    ExampleModel.findByIdAndDelete(exampleItemId, (error: Error, deleted: any) => {
      if (error) {
        res.send(error);
      }

      return deleted
        ? res.status(204).send(DELETE_SUCCESSFUL_MESSAGE)
        : res.status(404).send(RESOURCE_NOT_FOUND_MESSAGE);
    });
  }

  public updateExampleItem(req: Request, res: Response) {
    const exampleItemId = req.params.id;
    ExampleModel.findByIdAndUpdate(
      exampleItemId,
      req.body,
      { new: true }, //Return the updated object
      (error: Error, exampleItem: any) => {
        if (error) {
          res.send(error);
        }

        return exampleItem
          ? res.status(200).json(exampleItem)
          : res.status(404).send(RESOURCE_NOT_FOUND_MESSAGE);
      }
    );
  }
}
