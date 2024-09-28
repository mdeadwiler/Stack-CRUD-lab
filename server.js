// We begin by loading Express
const dotenv = require("dotenv"); // This is required package
dotenv.config(); // This loads the environment variables .env file
const express = require("express");
const mongoose = require("mongoose"); // This is a required package
const app = express();
app.use(express.urlencoded({ extended: false }));
// Connect to MongoDB using the connection string in the .env file
mongoose.connect(process.env.MONGODB_URI);
// log connection status to terminal on start
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});
// Import the CryptoTalk model
const CryptoTalk = require("./models/cryptoTalk.js");



// GET |index.ejs |server.js
app.get("/", async (req, res) => {
  res.render("index.ejs");
});

// GET.Render /blog/new
app.get("/pages/blogNew", (req, res) => {
    res.render("pages/blogNew.ejs");
  });
  
//Get.Send/blog/new
app.get("/pages/blogNew", (req, res) => {
  res.send("This route sends the block page!");
});
// POST |new blog
app.post("/pages", async (req, res) => {
  console.log(req.body);
  res.redirect("/pages/blogNew");//maybe add the slash back if it does not work
});



app.listen(3000, () => {
  console.log("Listening on port 3000");
});
