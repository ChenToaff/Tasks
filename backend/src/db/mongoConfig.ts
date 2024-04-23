import mongoose, { ConnectOptions } from "mongoose";

const mongoURI = "mongodb://localhost:27017/taskManagement";

const connectMongo = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Optionally exit process if MongoDB connection fails
  }
};

export default connectMongo;
