import mongoose from "mongoose";

const useSchema = new mongoose.Schema({
  id: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  image: String,
  bio: String,
  threads: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
    },
  ],
  onboarded: { type: Boolean, default: false },
  profile_photo: { type: String, default: "" },
  commuities: [{ type: mongoose.Schema.Types.ObjectId, ref: "Community" }],
});


const User =  mongoose.models.User || mongoose.model("User", useSchema);

export default User;