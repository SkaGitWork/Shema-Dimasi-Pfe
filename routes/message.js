import express from "express"
const router = express.Router()

import {
  getPatientsContacts,
  getDoctorContacts,
  getConversation,
  sendMessage,
} from "../controllers/message.js"

router.post("/chat/sendMessage", sendMessage)

router.get("/chat/getDoctorContacts", getPatientsContacts)
router.get("/chat/getPatientContacts", getDoctorContacts)
router.get("/chat/getConversation", getConversation)

export default router
