import mongoose from "mongoose";

const ExampleSchema = new mongoose.Schema({
  firstname: String,
  surname: String,
  type: String
});

export const ExampleModel = mongoose.model("ExampleMode", ExampleSchema);
