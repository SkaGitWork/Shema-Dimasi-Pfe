import User from "../../models/userModel.js"
import bcrypt from "bcrypt"

export const modifyUser = async (req, res) => {
  const { id } = req.params

  // Check New password
  if (
    req.body.initialPassword &&
    !(await bcrypt.compare(
      req.body.initialPassword,
      (
        await User.findById(id, { password: 1 })
      ).password
    ))
  ) {
    return res.status(500).send("Mot de passe initial est incorrect.")
  }

  req.body.password = await bcrypt.hash(req.body.password, 10)
  let user = await User.findByIdAndUpdate(id, req.body, {
    fields: { passwordRecovery: 0, patients: 0, doctors: 0 },
    new: true,
  })

  res.send(user)
}

// await new User({
//   username: "skaAdmin",
//   email: "admin@gmail.com",
//   password: await bcrypt.hash("admin", 10),
//   role: "Patient",
// }).save()

// await new User({
//   username: "Patient Test",
//   email: "patient@gmail.com",
//   password: await bcrypt.hash("1111", 10),
//   role: "Patient",
// }).save()

export const addUser = async (req, res) => {
  if (!req.body.email) {
    return res.status(500).send("Email Vide.")
  }

  // Check if username or email already used
  req.body.email = req.body.email.toLowerCase().trim()
  let count = await User.countDocuments({
    email: req.body.email,
  })
  if (count !== 0) {
    return res.status(500).send("Email déjà utilisé")
  }

  //  Register new user
  req.body.password = await bcrypt.hash(req.body.password, 10)
  let user = new User(req.body)
  await user.save()
  res.status(201).send(user)
}

export const deleteUser = async (req, res) => {
  const { id } = req.params
  await User.deleteOne({ _id: id })
  res.send(req.body.username + " a été supprimé")
}

export const fetchUser = async (req, res) => {
  res.send(
    await User.find(
      { _id: req.params.id },
      {
        password: 0,
        passwordRecovery: 0,
      }
    )
  )
}
