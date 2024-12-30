import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    default: "USER",
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
