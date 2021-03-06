import { Request, Response } from 'express';
import { MongooseDocument } from 'mongoose';
import { DELETE_SUCCESSFUL_MESSAGE, RESOURCE_NOT_FOUND_MESSAGE, WELCOME_MESSAGE } from '../constants/messages';
import { ExampleItemModel } from '../models/example-item';

export class ExampleService {
  public welcomeMessage(req: Request, res: Response) {
    return res.status(200).send(WELCOME_MESSAGE);
  }

  public getAllExampleItems(req: Request, res: Response) {
    ExampleItemModel.find({}, (error: Error, exampleItem: MongooseDocument) => {
      if (error) {
        return res.status(500).json({
          status: 'Error',
          message: error
        });
      }
      return res.json(exampleItem);
    });
  }

  public addNewExampleItem(req: Request, res: Response) {
    const newExampleItem = new ExampleItemModel(req.body);
    // tslint:disable-next-line:no-floating-promises
    newExampleItem.save((error: Error, exampleItem: MongooseDocument) => {
      if (error) {
        return res.status(500).json({
          status: 'Error',
          message: error
        });
      }
      return res.status(201).json(exampleItem);
    });
  }

  public getExampleItem(req: Request, res: Response) {
    const exampleItemId = req.params.id;

    ExampleItemModel.findById(exampleItemId, (error: Error, exampleItem: MongooseDocument) => {
      if (error) {
        return res.status(500).json({
          status: 'Error',
          message: error
        });
      }
      return exampleItem
        ? res.status(200).json(exampleItem)
        : res.status(404).json(RESOURCE_NOT_FOUND_MESSAGE);
    });
  }

  public deleteExampleItem(req: Request, res: Response) {
    const exampleItemId = req.params.id;
    // findOneAndDelete({_id: exampleItemId}).
    ExampleItemModel.findByIdAndDelete(exampleItemId, (error: Error, deleted: any) => {
      if (error) {
        return res.status(500).json({
          status: 'Error',
          message: error
        });
      }

      return deleted
        ? res.status(204).send(DELETE_SUCCESSFUL_MESSAGE)
        : res.status(404).send(RESOURCE_NOT_FOUND_MESSAGE);
    });
  }

  public updateExampleItem(req: Request, res: Response) {
    const exampleItemId = req.params.id;
    ExampleItemModel.findByIdAndUpdate(
      exampleItemId,
      req.body,
      { new: true }, // Return the updated object
      (error: Error, exampleItem: any) => {
        if (error) {
          return res.status(500).json({
            status: 'Error',
            message: error
          });
        }

        return exampleItem
          ? res.status(200).json(exampleItem)
          : res.status(404).json(RESOURCE_NOT_FOUND_MESSAGE);
      }
    );
  }
}
