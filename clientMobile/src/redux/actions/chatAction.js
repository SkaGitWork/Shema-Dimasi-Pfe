import { GET_DOCTORS } from "../../constants/actionTypes"
import Axios from "./../../api/axios"

export const fetchDoctors = () => async (dispatch) => {
  try {
    var data = await Axios.get("/user/getDoctors").then((res) => {
      return res.data
    })
    dispatch({ type: GET_DOCTORS, payload: data })
  } catch (error) {
    console.log(error)
  }
}
