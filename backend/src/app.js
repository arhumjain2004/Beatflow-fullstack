const express = require("express")
const CookieParser = require("cookie-parser")
const authRoutes = require("./routes/auth.routes")
const musicRoutes = require("./routes/music.routes")
const app = express()
const cors = require("cors");

app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://beatflow-fullstack.vercel.app" // 👈 ADD THIS
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json())
app.use(CookieParser())

app.use('/api/auth',authRoutes)
app.use('/api/music',musicRoutes)
module.exports = app