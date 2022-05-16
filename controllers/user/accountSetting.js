import bcrypt from "bcrypt"
import userModel from "../../models/userModel.js"

export const accountSettingModify = async (req, res) => {
  const { id } = req.params
  var  {  email, oldPassword, newPassword } = req.body

  let { password, email: oldEmail } = await userModel.findOne(
    {
      _id: id,
      role: "Doctor",
    },
    { password: 1, email: 1, _id: 0 }
  )

  if (oldPassword && !(await bcrypt.compare(oldPassword, password))) {
    return res.status(500).send("Mot de passe incorrect")
  } else {
    newPassword = await bcrypt.hash(newPassword, 10)
  }

  if (email === oldEmail) {
    email = null
  }
  if (
    email &&
    (
      await userModel.find({
        email: email,
      })
    ).length > 0
  ) {
    return res.status(500).send("Email déjà utilisé")
  }

  for (let prop in req.body) if (!req.body[prop]) delete req.body[prop] //it will remove fields who are undefined or null


  
  userModel.updateOne({ _id: id }, req.body, (err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.send("Modifié avec succès")
    }
  })
}

export const getUser = async (req, res) => {
  const { id } = req.params
  userModel.findOne(
    { _id: id },
    { _id: 0, username: 1, email: 1, phone: 1 },
    (err, user) => {
      if (err) {
        res.send(err)
      }
      res.send(user)
    }
  )
}
