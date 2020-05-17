import mongoose from "mongoose";
import User from "./reference/User";

const emotionSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  thumbnail: {
    type: String,
    default: "https://openbeats.live/static/media/dummy_music_holder.a3d0de2e.jpg",
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

emotionSchema.index({
  name: "text",
});


export default mongoose.model("Emotion", emotionSchema);