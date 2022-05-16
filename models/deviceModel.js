import mongoose from "mongoose"
const deviceScheme = mongoose.Schema(
  {
    deviceId: { type: String, unique: true },
    anomaly: { type: Boolean, default: false },
    lastTimeAnomaly: { type: Date },
    probability: { type: String, default: "0%" },
    alerts: { type: Array, default: null },
  },
  { timestamps: true }
)
export default mongoose.model("device", deviceScheme)
