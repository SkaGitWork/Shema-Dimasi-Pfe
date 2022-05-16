import express from "express"
import { deviceDataCreate, fetchDataCreate } from './../controllers/deviceData.js';
const router = express.Router()




router.post("/deviceData/create", deviceDataCreate)
// router.get("/device/notification/fetch", deviceNotificationFetch)
// router.get("/device/dashboard/fetch", deviceFetch)
// router.post("/registerSensorData", registerSensorData)

router.get("/deviceData/fetch/:id", fetchDataCreate)
// router.get("/getWaterPressureSensor", getWaterPressureSensor)
// router.get("/getMotionSensor", getMotionSensor)

export default router
