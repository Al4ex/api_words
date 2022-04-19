import mongoose from "mongoose";
const WordSchema = new mongoose.Schema({
    word: { type: String, required: true,  trim: true },
    allow: { type: Boolean,  required: true, trim: true },
    status: {type: String, select: false, default: "active"},
    dateDeleted: Date
}, { timestamps: { createdAt: 'dateCreated', updatedAt: 'lastDateUpdated' },
    versionKey: false }
);

export default mongoose.model("Word", WordSchema);