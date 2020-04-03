import mongoose from 'mongoose';

export async function connect(mongoUri: string) {
  try {
    await mongoose.connect(
      mongoUri,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      }
    );

    console.log(`MongoDb Connection successful`);
    return mongoose.connection;
  } catch (err) {
    console.log('Error while connecting on MongoDb', err);
  }
};

export async function disconnect() {
  await mongoose.connection.close();
  console.log(`MongoDb Connection closed successfully`);

};
