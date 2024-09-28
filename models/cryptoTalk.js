// models/cryptoTalk.js
const mongoose = require("mongoose");
const cryptoTalkSchema = new mongoose.Schema({
    name: String,
    talk: String,
  });

  const CryptoTalk = mongoose.model("cryptoTalk", cryptoTalkSchema); // create model


  // models/cryptoTalk.js
module.exports = CryptoTalk;
