import User from "./Schemes/User.js"
import Doctor from "./Schemes/Doctor.js"
import Patient from "./Schemes/Patient.js"
import Device from "./Schemes/Device.js"
import Conversation from "./Schemes/Conversation.js"
import Message from "./Schemes/Message.js"

export default function Post(app) {
  function postCreateEndpoint(url, scheme) {
    app.post(url, (req, res) => {
      scheme.create(req.body, (err, data) => {
        if (err) {
          res.status(500).send(err)
        } else {
          res.status(201).send(data)
        }
      })
    })
  }

  postCreateEndpoint("/newMessage", Message)
  postCreateEndpoint("/newUser", User)
  postCreateEndpoint("/newConversation", Conversation)
  postCreateEndpoint("/device/create", Device)
  postCreateEndpoint("/doctor/create", Doctor)

 

  // Login Doctor
  app.post("/login", async (req, res) => {
    var result = await Doctor.findOne({
      email: req.body.email,
      password: req.body.password,
    })

    if (result) {
      return res.send({
        role: result.role,
        username: result.username,
      })
    } else {
      res.status(404).send("Données incorrectes")
    }
  })

  //! -------------------------- Add new patient ---------------------------- |
  app.post("/patient/addPatient", async (req, res) => {
    const user = await Patient.findOne({
      username: req.body.username.trim(),
      email: req.body.email.toLowerCase().trim(),
    })

    if (user) {
      return res.status(500).send("Patient déjà existant.")
    } else {
      Patient.create(
        {
          username: req.body.username.trim(),
          email: req.body.email.trim().toLowerCase(),
          password: req.body.password,
        },
        (err, data) => {
          if (err) {
            res.status(500).send(err)
          } else {
            res.status(201).send("Patient crée.")
          }
        }
      )
    }
  })

  
}
