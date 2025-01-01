import mongoose from "mongoose";

const phoneSchema = new mongoose.Schema({
  title: {
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
  quantity: {
    type: Number,
    required: true,
  },
  feedbacks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Feedback",
    },
  ],
});

const Phone = mongoose.models.Phone || mongoose.model("Phone", phoneSchema);
export default Phone;
