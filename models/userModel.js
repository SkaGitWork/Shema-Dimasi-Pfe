import mongoose from "mongoose"
const userScheme = mongoose.Schema({
  // Credentials
  name: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },


  // wearableDevice: { type: String },
  // refreshToken: { type: String },

  smoker: Boolean,
  drinker: Boolean,
  sportive: Boolean,
  cholesterol: Boolean,
  glucose: Boolean,

  height: String,
  weight: String,
  gender: String,
  birthday: String,
})
export default mongoose.model("user", userScheme)