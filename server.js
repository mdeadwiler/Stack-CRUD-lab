const dotenv = require("dotenv"); // This is required package
dotenv.config(); // This loads the environment variables .env file
const express = require("express");
const mongoose = require("mongoose"); // This is a required package
const app = express();
// Import the CryptoTalk model
const CryptoTalk = require("./models/cryptoTalk.js");

// Connect to MongoDB using the connection string in the .env file
mongoose.connect(process.env.MONGODB_URI);
// log connection status to terminal on start
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});
app.use(express.urlencoded({ extended: false }));

//Routes|Golden 7
// GET |index.ejs |Home
app.get("/", async (req, res) => {
  res.render("index.ejs");
});
// GET.Render |blog/new
app.get("/pages/new", async (req, res) => {
  res.render("pages/new.ejs");
});
// POST |New Blog
app.post("/pages", async (req, res) => {
//  await CryptoTalk.create(req.body);
console.log(req.body)
  res.redirect("pages/new");
});



app.listen(3000, () => {
  console.log("Listening on port 3000");
});
