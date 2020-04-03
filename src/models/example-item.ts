import mongoose from 'mongoose';

export const ExampleItemSchema = new mongoose.Schema({
  firstName: String,
  surname: String,
  type: String
});

export const ExampleItemModel = mongoose.model('ExampleItemModel', ExampleItemSchema);
