import userModel from "../../models/userModel.js"



export const modifyPatient = (req, res) => {

  const {id} = req.params
  userModel.updateOne({ _id: id }, req.body, (err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(201).send("Compte modifié")
    }
  })
}


