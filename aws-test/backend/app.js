const express = require("express");
const mongoose = require("mongoose");

// require("dotenv").config()

const app = express();

app.use(bodyParser.json());

// app.use(express.static(path.join(__dirname, "../front/build")))
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "../front/build", "index.html"))
// })

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

mongoose
  .connect(
    "mongodb+srv://system:1234@cluster0.hfg277q.mongodb.net/sport?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
