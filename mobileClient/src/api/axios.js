
import { Platform } from "react-native"
import axios from "axios"
const Axios = axios.create({
  baseURL:
    Platform.OS === "web"
      ? "http://localhost:8001"
      : "http://192.168.1.7:8001",
})
export default Axios
