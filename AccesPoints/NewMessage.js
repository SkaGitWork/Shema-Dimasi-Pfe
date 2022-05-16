import axios from "../axios.js"
import Message from "../Schemes/Message.js"


export default async function NewMessage(req, res) {
  // res.send(req.body)

  // Create Message
  Message.create(req.body, (err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(201).send(data)
    }
  })

  //  var dbData = await getData("/getUsers")

  //  PostMessage()

  //   const getData = async (url) => {
  //     return axios.get(url).then((response) => response.data)
  //   }

  //   const PostMessage = () => {
  //     let MessageData = {
  //       postedBy: dbData[0],
  //       email: encryptedEmail,
  //       date: req.date,
  //     }
}
