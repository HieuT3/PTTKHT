import mongoose from "mongoose";

let isConnect = false;

const mongoURI = process.env.CONNECTION_STRING;

const connectDB = async () => {
  if (isConnect) {
    console.log("MongoDB đã được kết nối trước đó!");
    return;
  }

  try {
    await mongoose.connect(mongoURI);
    console.log("Kết nối MongoDB thành công!");
    isConnect = true;
  } catch (error) {
    console.error("Lỗi kết nối MongoDB:", error.message);
  }
};

export default connectDB;
