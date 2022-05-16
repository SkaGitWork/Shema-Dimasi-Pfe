import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import User from "../models/userModel.js"

export default function Login(app) {
  // Login
  app.post("/authentification/login", async (req, res) => {
    const user = await User.findOne({
      email: req.body.email.toLowerCase().trim(),
    })

    if (!user) {
      return res.status(406).send("Aucun compte trouvé")
    }
    
    if (
      (await bcrypt.compare(req.body.password, user.password)) ||
      (user.passwordRecovery
        ? await bcrypt.compare(req.body.password, user.passwordRecovery)
        : false)
        ) {
          // Generate Access Token
      const accessToken = jwt.sign(
        { username: user.username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_SECRET_EXPIRATION_TIME }
      )

      // Generate Refresh Token
      const refreshToken = jwt.sign(
        { username: user.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_SECRET_EXPIRATION_TIME }
      )
      // Store refresh token
      await User.findOneAndUpdate(
        { username: user.username },
        {
          refreshToken: refreshToken,
        }
      )

      // If it's his original password...
      if (user.passwordRecovery == null) {
        return sendAccessInformations(accessToken, refreshToken)
      } else {
        
        // Else set his recovered password as his new password...
        User.findOneAndUpdate(
          { email: req.body.email },
          {
            password: user.passwordRecovery,
          },
          () => {
            return sendAccessInformations(accessToken, refreshToken)
          }
        )
      }
    } else {
      return res.status(406).send("Mot de passe incorrect")
    }

    function sendAccessInformations(accessToken, refreshToken) {
      return res.send({
        id: user._id,
        role: user.role,
        username: user.username,
        accessToken: accessToken,
        refreshToken: refreshToken,
      })
    }
  })
}
