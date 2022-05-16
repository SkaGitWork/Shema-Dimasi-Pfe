import express from "express"
const router = express.Router()

import { modifyPatient } from "./../controllers/user/patientList.js"
import {
  changePassword,
  savePushToken,
  getPushToken,
  getDoctorsUsername,
  getPatientsUsername,
  getDoctorContacts,
  getPatientContacts,
  addDoctorToContact,
  addPatientToContact,
  deleteDoctorFromContacts,
  deletePatientFromContacts,
  getPatientsList,
  deletePatient,
  // modifyUser,
  getDoctors,
} from "../controllers/user.js"
import {
  accountSettingModify,
  getUser,
} from "../controllers/user/accountSetting.js"
import {
  modifyUser,
  addUser,
  deleteUser,
  fetchUser,
} from "./../controllers/user/userController.js"

router.get("/user/accountSetting/getUser/:id", getUser)

router.get("/user/getDoctors", getDoctorsUsername)
router.get("/user/getPatients", getPatientsUsername)
router.get("/user/getDoctorContacts", getDoctorContacts)
router.get("/user/getPatientContacts", getPatientContacts)
router.get("/patientList/getPatients", getPatientsList)
router.get("/doctorList/getDoctors", getDoctors)

router.post("/user/addUser", addUser)
// router.post("/user/modifyUser", modifyUser)
router.post("/savePushToken", savePushToken)
router.post("/getPushToken", getPushToken)
router.post("/changePassword", changePassword)

router.put("/user/accountSetting/modify/:id", accountSettingModify)

router.post("/user/addDoctorToContact", addDoctorToContact)
router.post("/user/addPatientToContact", addPatientToContact)
router.post("/user/patientList/modifyPatient/:id", modifyPatient)

router.delete("/user/delete/doctorFromContacts", deleteDoctorFromContacts)
router.delete("/user/delete/patientFromContacts", deletePatientFromContacts)
router.delete("/user/patientList/deletePatient", deletePatient)
router.delete("/user/deleteUser/:id", deleteUser)

router.patch("/user/modifyUser/:id", modifyUser)

router.get("/user/fetch/:id", fetchUser)

export default router
