import mongoose from "mongoose"
const userScheme = mongoose.Schema({
  // Credentials
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  passwordRecovery: { type: String, default: null },
  role: { type: String, required: true },

  // Contacts
  patients: { type: Array, default: [] },
  doctors: { type: Array, default: [] },

  wearableDevice: { type: String },
  refreshToken: { type: String },

  birthday: { type: Date },
  phone: { type: String },
  phone: { type: String },
  address: { type: String },
  city: { type: String },
  cin: { type: String },
})
export default mongoose.model("user", userScheme)