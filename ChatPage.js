import User from "./Schemes/User.js"
import Doctor from "./Schemes/Doctor.js"
import Patient from "./Schemes/Patient.js"
import Device from "./Schemes/Device.js"
import Conversation from "./Schemes/Conversation.js"
import Message from "./Schemes/Message.js"

export default function Get(app) {
  // ! ------------------- Get patients for Contacts -----------------------

  app.post("/Chat/getPatients", async (req, res) => {
    const user = await User.findOne({ username: req.body.username })

    if (user) {
      res.send(user.patients)
    } else {
      res.status(500).send("Ce patient existe déjà.")
    }
  })

  // ! ------------------- Get doctors for Contacts -----------------------

  app.post("/chat/getPatientContacts", async (req, res) => {
    const user = await User.findOne({ username: req.body.username })

    res.send(user.doctors)
  })

  //! -------------------------- Add patient to chat --------------------------- |
  app.post("/Chat/addPatient", async (req, res) => {
    let user = await User.findOneAndUpdate(
      { username: req.body.username },
      { $push: { patients: req.body.patientUsername } },
      { new: true }
    )

    res.send(user.patients)
  })

  //! -------------------------- Add Doctor to chat --------------------------- |
  app.post("/Chat/addDoctor", async (req, res) => {
    let user = await User.findOneAndUpdate(
      { username: req.body.username },
      { $push: { doctors: req.body.doctorUsername } },
      { new: true }
    )

    res.send(user.doctors)
  })

  {
    /* //! ------------- Delete ----------------- */
  }
  //  Delete patient from contacts
  app.post("/chat/deletePatient", async (req, res) => {
    let user = await User.findOneAndUpdate(
      { username: req.body.username },
      {
        $pull: {
          patients: req.body.patientUsername,
        },
      },
      { new: true }
    )
    res.send(user.patients)
  })

  //  Delete doctor from contacts
  app.post("/chat/deleteDoctor", async (req, res) => {
    User.findOneAndUpdate(
      { username: req.body.username },
      {
        $pull: {
          doctors: req.body.doctorUsername,
        },
      },
      { new: true, passRawResult: true },
      (err, doc, raw) => {
        res.send(doc.doctors)
      }
    )
    // res.send(req.body.doctorUsername + " a été supprimé des contacts.")
  })

  {
    /* //! ------------ Messages ---------------- */
  }
  // get Messages from x to y
  app.post("/chat/getConversation", (req, res) => {
    Message.find(
      {
        $or: [
          { $and: [{ to: req.body.from }, { from: req.body.to }] },
          { $and: [{ from: req.body.from }, { to: req.body.to }] },
        ],
      },
      (err, data) => {
        if (err) {
          res.status(500).send(err)
        } else {
          res.status(200).send(data)
        }
      }
    )
  })
  // New message
  app.post("/chat/newMessage", (req, res) => {
    Message.create(req.body, (err, data) => {
      if (err) {
        res.status(500).send(err)
      } else {
        res.status(201).send(data)
      }
    })
  })
}
