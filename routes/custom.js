import express from "express"
import userModel from "../models/userModel.js"
const router = express.Router()

const schemes = {
  user: userModel,
}

const custom = async (req, res) => {
  const { filters = {}, fields = {}, selectedId } = req.body
  console.log(req.body)

  const selectedScheme = schemes[req.body.scheme]
  try {
    var returnedDocument
    switch (req.body.method) {
      case "get":
        if (filters._id) {
          returnedDocument = await selectedScheme.findOne(filters, {
            ...fields,
            password: 0,
          })
          break
        }
        returnedDocument = await selectedScheme.find(filters, {
          ...fields,
          password: 0,
        })
        break
      case "post":
        console.log(req.body)
        returnedDocument = await selectedScheme.create(req.body)
        break
      case "patch":
        returnedDocument = await selectedScheme.findOneAndUpdate(
          { _id: selectedId },
          { $set: req.body },
          { returnOriginal: false }
        )
        break
      case "delete":
        await selectedScheme.deleteOne(selectedId)
        returnedDocument = "Delete one success."
        break

      default:
        returnedDocument = "Method is missing."
        break
    }

    res.send(returnedDocument)
  } catch (error) {
    res.status(500).send(error)
  }
}

router.post("/custom", custom)

export default router
