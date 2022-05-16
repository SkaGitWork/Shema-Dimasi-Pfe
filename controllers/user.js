import User from "../models/userModel.js"
import bcrypt from "bcrypt"

export const modifyUser = async (req, res) => {
  // Check Valid Email
  if (checkValidEmail(req.body.email)) {
    var replaceWith
    // Check if no new password is sent...
    if (!req.body.password) {
      replaceWith = {
        username: req.body.username,
        email: req.body.email,
        ...(req.body.password?.length > 3
          ? { password: await bcrypt.hash(req.body.password, 10) }
          : null),
      }
      // Password too short
    } else {
      return res.send("Mot de passe doit dépasser 3 caractères")
    }

    // Modify user credentials
    await User.findOneAndUpdate(
      { username: req.body.originalUsername },
      replaceWith
    )

    res.send(req.body.originalUsername + " a été modifier")
  } else {
    res.send("Email Invalide")
  }
}




export const changePassword = async (req, res) => {
  app.post("/changePassword", async (req, res) => {
    // Find user credentials
    const user = await User.findOne({
      username: req.body.username,
    })

    if (await bcrypt.compare(req.body.initialPassword, user.password)) {
      User.findOneAndUpdate(
        { username: req.body.username },
        {
          password: await bcrypt.hash(req.body.newPassword, 10),
        },
        (err, doc, raw) => {
          res.send("Mot de passe changé")
        }
      )
    } else {
      res.status(500).send("Mot de passe initial est incorrect")
    }
  })
}
export const savePushToken = async (req, res) => {
  await User.findOneAndUpdate(
    { username: req.body.username },
    { token: req.body.token },
    {
      new: true,
    }
  )

  res.send(req.body)
}
export const getPushToken = async (req, res) => {
  await User.findOne({ username: req.body.username }, function (err, user) {
    if (user) {
      res.send(User.token)
    }
  })
}
export const getDoctorsUsername = async (req, res) => {
  User.aggregate(
    [
      { $match: { role: "Doctor" } },
      {
        $group: {
          _id: "1",
          usernames: {
            $push: "$username",
          },
        },
      },

      { $project: { _id: 0 } },
    ],
    function (err, user) {
      if (err) {
        res.send(err)
      }
      res.send(user[0].usernames)
    }
  )
}
export const getPatientsUsername = async (req, res) => {
  User.aggregate(
    [
      { $match: { role: "Patient" } },
      {
        $group: {
          _id: "1",
          usernames: {
            $push: "$username",
          },
        },
      },

      { $project: { _id: 0 } },
    ],
    function (err, user) {
      if (err) {
        res.send(err)
      }
      res.send(user[0].usernames)
    }
  )
}
export const getPatientsList = async (req, res) => {
  User.aggregate(
    [
      { $match: { role: "Patient" } },
      {
        $project: {
          _id: 1,
          username: 1,
          email: 1,
          birthday: 1,
          phone: 1,
          address: 1,
          city: 1,
          cin: 1,
        },
      },
    ],
    function (err, user) {
      if (err) {
        res.send(err)
      }
      res.send(user)
    }
  )
}

{
  /* //! ------------- Doctors ---------------- */
}

export const getDoctors = async (req, res) => {
  User.aggregate(
    [
      { $match: { role: "Doctor" } },
      {
        $project: {
          _id: 1,
          username: 1,
          email: 1,
          birthday: 1,
          phone: 1,
          address: 1,
          city: 1,
          cin: 1,
        },
      },
    ],
    function (err, user) {
      if (err) {
        return res.send(err)
      }
      res.send(user)
    }
  )
}
export const getDoctorContacts = async (req, res) => {
  User.findOne(
    { role: "Patient", username: req.query.username },
    (err, user) => {
      if (err) {
        res.send(err)
      }
      res.send(user.doctors)
    }
  )
  // User.aggregate(
  //   [
  //     { $match: { role: "Patient", username: req.query.username } },
  //     {
  //       $group: {
  //         _id: "$doctors",
  //       },
  //     },

  //     // { $project: { _id: 0 } },
  //   ],
  //   function (err, user) {
  //     if (err) {
  //       res.send(err)
  //     }
  //     console.log(user)
  //     //  res.send(user[0].usernames)
  //   }
  // )
}
export const getPatientContacts = async (req, res) => {
  User.findOne(
    { role: "Doctor", username: req.query.username },
    (err, user) => {
      if (err) {
        res.send(err)
      }
      res.send(user.patients)
    }
  )
}

export const addDoctorToContact = async (req, res) => {
  User.findOneAndUpdate(
    { role: "Patient", username: req.body.username },
    { $addToSet: { doctors: req.body.doctor } },
    { new: true },
    (err, doc) => {
      if (err) {
        res.send(err)
      }
      res.send(doc.patients)
    }
  )
}

export const addPatientToContact = async (req, res) => {
  User.findOneAndUpdate(
    { role: "Doctor", username: req.body.username },
    { $addToSet: { patients: req.body.patient } },
    { new: true },
    (err, doc) => {
      if (err) {
        res.send(err)
      }
      res.send(doc.patients)
    }
  )
}

// Delete
export const deleteDoctorFromContacts = async (req, res) => {
  User.findOneAndUpdate(
    { role: "Patient", username: req.body.username },
    { $pull: { doctors: req.body.doctor } },
    { new: true },
    (err, doc) => {
      if (err) {
        res.send(err)
      }
      res.send("Contact docteur supprimé")
    }
  )
}
export const deletePatientFromContacts = async (req, res) => {
  User.findOneAndUpdate(
    { role: "Doctor", username: req.body.username },
    { $pull: { patients: req.body.patient } },
    { new: true },
    (err, doc) => {
      if (err) {
        res.send(err)
      }
      res.send("Contact patient supprimé")
    }
  )
}
export const deletePatient = async (req, res) => {
  User.findOneAndRemove(
    { role: "Patient", username: req.body.username },
    { $pull: { patients: req.body.patient } },
    { new: true },
    (err, doc) => {
      if (err) {
        res.send(err)
      }
      res.send("Contact patient supprimé")
    }
  )
}

function checkValidEmail(x) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(x)
}
