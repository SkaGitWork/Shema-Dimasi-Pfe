import deviceModel from "../models/deviceModel.js"

export const deviceNotificationFetch = async (req, res) => {
  const result = await deviceModel.find({}, {_id : 0,deviceId : 1, alerts: 1 })

  res.send(result)
}

export const deviceFetch = async (req, res) => {
  res.send(await deviceModel.find({}))
}
