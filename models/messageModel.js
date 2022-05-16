import mongoose from "mongoose"
const MessageScheme = mongoose.Schema(
  {
    from: String,
    to: String,
    text: String,
  },
  { timestamps: true }
)
export default mongoose.model("Message", MessageScheme)
