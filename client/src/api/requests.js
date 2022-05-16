import Axios from "./axios"

export const loginRequest = async (email, password) => {
  return await Axios.post("/authentification/login", {
    email: email,
    password: password,
  })
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      console.log(err.response.data)
      return err.response.data
    })
}
