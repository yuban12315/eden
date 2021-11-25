import mongoose from "mongoose";

const { DB_URL = "mongodb://localhost:27017", DB_NAME } = process.env;

export const startMongoDB = async (): Promise<void> => {
  console.log("Connecting to MongoDB......");
  await mongoose.connect(DB_URL, { dbName: DB_NAME });

  mongoose.connection.on("open", () => {
    console.log(`🚀 Connected to MongoDB, url: ${DB_URL}`);
  });

  mongoose.connection.on("error", (err) => {
    console.error(err);
  });
};
