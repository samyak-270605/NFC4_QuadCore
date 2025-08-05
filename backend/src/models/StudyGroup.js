import mongoose from "mongoose";

const studyGroupSchema = new mongoose.Schema({
  groupName: {
    type: String,
    required: true,
  },
  field: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  maxMembers: {
    type: Number,
    default: 10,
  },
  mode: {
    type: String,
    enum: ["Online", "Offline", "Hybrid"],
    default: "Online",
  },
  meetingLink: {
    type: String,
    default: "",
  },
  universitySpecific: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true }); 

const StudyGroup = mongoose.model("StudyGroup", studyGroupSchema);

export default StudyGroup;