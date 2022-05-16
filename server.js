// require("crypto").randomBytes(64).toString("hex")

import "dotenv/config"
import app from "./config.js"
import passwordRestoration from "./controllers/passwordRestoration.js"
import login from "./controllers/login.js"
import authenticateToken from "./middleware/authenticateToken.js"
import { verifyToken } from "./controllers/token.js"
import { deleteToken } from "./controllers/token.js"

import userRouter from "./routes/user.js"
import deviceRouter from "./routes/device.js"
import messageRouter from "./routes/message.js"
import deviceDataRouter from "./routes/deviceData.js"

// Doctor and patient login
login(app)
// Restore Password
passwordRestoration(app)

// Manage Token
verifyToken()
deleteToken()

// Middleware: Check authorized Access
// app.use(authenticateToken)

// ChatPage(app)

app.use(userRouter)
app.use(deviceRouter)
app.use(messageRouter)
app.use(deviceDataRouter)
