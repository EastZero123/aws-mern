const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const path = require("path")

const placesRoutes = require("./routes/places-routes")
const usersRoutes = require("./routes/users-routes")
const HttpError = require("./models/http-error")
require("dotenv").config()

const app = express()

app.use(express.static(path.join(__dirname, "../front/build")))
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../front/build", "index.html"))
})
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  )
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE")
  next()
})

app.use("/api/places", placesRoutes) // => /api/places...
app.use("/api/users", usersRoutes)

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404)
  throw error
})

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error)
  }
  res.status(error.code || 500)
  res.json({ message: error.message || "An unknown error occurred!" })
})

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(5000)
  })
  .catch((err) => {
    console.log(err)
  })
