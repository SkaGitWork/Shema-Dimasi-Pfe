
import { GET_DOCTORS, SEARCH_INPUT } from './../../constants/actionTypes';
const chatReducer = (
  state = {
    userInput : "",
    chatDoctors : [],
  },
  action
  ) => {
  switch (action.type) {
    case SEARCH_INPUT:
      return { ...state, userInput: action.payload }
    case GET_DOCTORS:
      return { ...state, chatDoctors: action.payload }

    default:
      return state
  }
}


export default chatReducer
