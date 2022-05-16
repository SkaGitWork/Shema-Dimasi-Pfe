
import deviceDataModel from "../models/deviceDataModel.js"

export const deviceDataCreate = async (req, res) => {
console.log(req.body)

 await deviceDataModel.create(req.body)
  
  res.send(req.body)
}

export const fetchDataCreate = async (req, res) => {


  res.send(await deviceDataModel.find({deviceParent : req.params.id}))
}


