import mongoose, { Mongoose } from "mongoose";
interface MongooseGlobal extends NodeJS.Global {
  mongoose: any;
}

declare var global: MongooseGlobal;

declare global {
  namespace NodeJS {
    interface Global {
      mongoose: MongooseGlobal;
    }
  }
}


let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { connection: null, promise: null };
}

export const connectToDB = async () => {
  if (cached.connection) {
    console.info("=> using existing database connection");
    return cached.connection;
  }

  if (!cached.promise) {
    console.info("=> using new database connection");
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    cached.promise = mongoose
      .connect(process.env.MONGODB_URI!, opts)
      .then((mongoose) => {
        return mongoose;
      });
  }

  cached.connection = await cached.promise;
  return cached.connection;
};
