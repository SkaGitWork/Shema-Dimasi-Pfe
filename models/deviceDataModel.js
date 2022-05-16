import mongoose from "mongoose"
const deviceDataScheme = mongoose.Schema(
  {
    deviceParent: { type: String },
    image: { type: String },
    // // anomaly: { type: Boolean, default: false },
    // // lastTimeAnomaly: { type: Date },
    // // probability: { type: String, default: "0%" },
    // // alerts: { type: Array, default: null },
  },
  { timestamps: true }
)
export default mongoose.model("deviceData", deviceDataScheme)
