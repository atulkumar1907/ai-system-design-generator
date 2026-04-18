import mongoose, { Schema } from "mongoose";

const NodeSchema = new Schema({
  id: String,
  type: String,
  label: String,
  x: Number,
  y: Number,
  color: String,
});

const EdgeSchema = new Schema({
  id: String,
  from: String,
  to: String,
  label: String,
});

const DiagramSchema = new Schema(
  {
    prompt: { type: String, required: true },
    systemName: { type: String, required: true },
    architectureType: { type: String, required: true },

    nodes: [NodeSchema],
    edges: [EdgeSchema],

    explanation: { type: Object, required: true },
    metrics: { type: Object },

    tags: [String],

    sessionId: String,

    isFork: { type: Boolean, default: false },
    forkedFromId: { type: Schema.Types.ObjectId },
  },
  { timestamps: true }
);

export default mongoose.model("Diagram", DiagramSchema);