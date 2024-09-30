const dotenv = require("dotenv"); // This is required package
dotenv.config(); // This loads the environment variables .env file
const express = require("express");
const mongoose = require("mongoose"); // This is a required package
const methodOverride = require("method-override"); // new
const morgan = require("morgan"); //new
const app = express();
// Import the CryptoTalk model
const CryptoTalk = require("./models/cryptoTalk.js");
// Connect to MongoDB using the connection string in the .env file
mongoose.connect(process.env.MONGODB_URI);
// log connection status to terminal on start
mongoose.connection.on("connected", () => {
console.log(`Connected to MongoDB ${mongoose.connection.name}.`);});
// Database connection code
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method")); // new
app.use(morgan("dev")); //new

//Routes
// |Golden 7
// GET |index.ejs |HOME
app.get("/", async (req, res) => {
  res.render("index.ejs");
});

// GET |Talkers |READ CRUD
app.get("/pages", async (req, res) => {
  const allTalkers = await CryptoTalk.find();
  //console.log(allTweeters); // This logs all talkers
  res.render("pages/index.ejs", { talkers: allTalkers});
});


// GET.Render |blog/NEW
app.get("/pages/new", async (req, res) => {
  res.render("pages/new.ejs");
});
// POST |New Blog |Create CRUD 
app.post("/pages", async (req, res) => {
  if (req.body.name === "on" && req.body.story === "on") {
    req.body.name = true;
  } else {
    console.log(req.body.story);
  }
 
  await CryptoTalk.create(req.body);
  res.redirect("/pages");
});


app.get("/talkers/:talkerId", async (req, res) => {
  const foundTalker = await CryptoTalk.findById(req.params.talkerId);
  res.render("pages/show.ejs", { talkers: foundTalker });
});


// GET localhost:3000/fruits/:fruitId/edit
app.get("/talkers/:talkerId/edit", async (req, res) => {
  const foundTalker = await CryptoTalk.findById(req.params.talkerId);
  res.render("pages/edit.ejs", {
    talkers: foundTalker,
  });
});

// GET localhost:3000/talkers/:talkerId/edit |UPDATE 
app.put("/talkers/:talkerId", async (req, res) => {
  const { name, story } = req.body
  if (req.body.story === "on" && req.body.name === "on") {
    req.body.story = true;
  } else {
    console.log(req.body.name);
  }
  await CryptoTalk.findByIdAndUpdate(req.params.talkerId, {name, story} , {new: true});
  res.redirect("/pages");
});

// |DELETE CRUD
app.delete("/talkers/:talkerId", async (req, res) => {
  await CryptoTalk.findByIdAndDelete(req.params.talkerId);
  res.redirect("/pages");
});










app.listen(3000, () => {
  console.log("Listening on port 3000");
});
