import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MongoDbConnect: string = process.env.MONGODB_URI as string;

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MongoDbConnect);
    console.log("MongoDB connected...");
  } catch (error) {
    if (error instanceof Error) {
      console.error("Problem Med Anslutning Till Monggose", error.message);
    } else {
      console.error("Unexpected error med connection till MongoDB", error);
    }
    process.exit(1);
  }
};

export default connectDB;
