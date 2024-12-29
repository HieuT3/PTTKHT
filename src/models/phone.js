import mongoose from "mongoose";

const phoneSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
  reviews: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  imageurl: {
    type: String,
    required: true,
  },
});

const Phone = mongoose.models.Phone || mongoose.model("Phone", phoneSchema);
export default Phone;
