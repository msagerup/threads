import mongoose from 'mongoose';

const threadSchema = new mongoose.Schema({
    text: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    community: { type: mongoose.Schema.Types.ObjectId, ref: "Community" },  
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    parentId: {type: String},
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Thread" }],
});


const Thread =  mongoose.models.Thread || mongoose.model("Thread", threadSchema);

export default Thread;