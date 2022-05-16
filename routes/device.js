import express from "express"
const router = express.Router()

import { deviceFetch, deviceNotificationFetch } from "./../controllers/device.js"

router.get("/device/notification/fetch", deviceNotificationFetch)
router.get("/device/dashboard/fetch", deviceFetch)
// router.post("/registerSensorData", registerSensorData)

// router.get("/getAllSensor", getAllSensor)
// router.get("/getWaterPressureSensor", getWaterPressureSensor)
// router.get("/getMotionSensor", getMotionSensor)

export default router
