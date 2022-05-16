import Message from "../models/messageModel.js"
import User from "../models/userModel.js"
import bcrypt from "bcrypt"

export const getPatientsContacts = async (req, res) => {
  
    const user = await User.findOne({ username: req.body.username })

    res.send(user.doctors)
  
}
export const getDoctorContacts = async (req, res) => {
    const user = await User.findOne({ username: req.body.username })
    res.send(user.patients)
  
}
export const getConversation = async (req, res) => { 
    Message.find(
      {
        $or: [
          { $and: [{ to: req.query.from }, { from: req.query.to }] },
          { $and: [{ from: req.query.from }, { to: req.query.to }] },
        ],
      },
      (err, conv) => {
        if (err) {
          res.status(500).send(err)
        } else {
          res.status(200).send(conv)
        }
      }
    )
  }

export const sendMessage = async (req, res) => {
  
    Message.create(req.body, (err, data) => {
      if (err) {
        res.status(500).send(err)
      } else {
        res.status(201).send(data)
      }
    })
  
}
