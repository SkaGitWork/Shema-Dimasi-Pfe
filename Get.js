import User from "./Schemes/User.js"
import Device from "./Schemes/Device.js"

import Message from "./Schemes/Message.js"

export default function Get(app) {
  function getEndpoint(url, scheme) {
    app.get(url, (req, res) => {
      scheme.find((err, data) => {
        if (err) {
          res.status(500).send(err)
        } else {
          res.status(200).send(data)
        }
      })
    })
  }

  getEndpoint("/getUsers", User)
  getEndpoint("/getMessages", Message)
  getEndpoint("/device/fetch", Device)

  
  app.get("/chat/getPatientContacts", (req, res) => {
    User.find({username : req.body.username}, (err, data) => {
      if (err) {
        res.status(500).send(err)
      } else {
        res.status(200).send(data)
      }
    })
  })
  app.get("/getUsers/doctorsUsername", (req, res) => {
    User.find({ role: "Doctor" }, { username: 1, _id: 0 }, (err, data) => {
      if (err) {
        res.status(500).send(err)
      } else {
        res.status(200).send(data)
      }
    })
  })
  app.get("/getUsers/patientUsername", (req, res) => {
    User.find({ role: "Patient" }, { username: 1, _id: 0 }, (err, data) => {
      if (err) {
        res.status(500).send(err)
      } else {
        res.status(200).send(data)
      }
    })
  })
}


// get Conversation
// app.get("/getConversation", (req, res) => {
//   Conversation.find()
//     .populate("doctorId")
//     .populate("patientId")
//     .exec()
//     .then((err, data) => {
//       if (err) {
//         res.status(500).send(err)
//       } else {
//         res.status(200).send(data)
//       }
//     })

// })
