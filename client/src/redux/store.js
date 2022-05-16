import { configureStore, applyMiddleware } from "@reduxjs/toolkit"
import thunk from "redux-thunk"
import chatReducer from "./reducers/chatReducer"

export default configureStore({
  reducer: { chat: chatReducer},
},applyMiddleware(thunk))
