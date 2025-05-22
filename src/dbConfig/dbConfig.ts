import mongoose from "mongoose";

export async function connect() {
  try {
    const MONGODB_URI = process.env.MONGO_URI!;

    if (!MONGODB_URI) {
      throw new Error('Please define the MONGODB_URI environment variable in .env.local');
    }
    mongoose.connect(MONGODB_URI);
    const connection = mongoose.connection;
    connection.on('connected', () => {
      console.log("Mongodb connected successfully");
    });

    connection.on('error', (err) => {
      console.log("Mongodb connection error. Make sure MongoDB is running " + err);
      process.exit();
    });
  }
  catch (error) {
    console.log("something went wrong!");
    console.log(error);
  }
}