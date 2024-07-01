import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
  connection: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cached: MongooseConnection = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    connection: null,
    promise: null,
  };
}

export const connectToDatabase = async () => {
  if (cached.connection) return cached.connection;

  if (!MONGODB_URL) {
    throw new Error('Please define the MONGODB_URL environment variable inside .env.local');
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URL, {
      dbName: 'PhotoTask',
      bufferCommands: false,
    });
  }

  try {
    cached.connection = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.connection;
};
