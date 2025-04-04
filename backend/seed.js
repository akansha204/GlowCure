require("dotenv").config();
const mongoose = require("mongoose");
const { RemedyModel } = require("./db");
const remediesData = require("./remedies.json");

mongoose
  .connect(process.env.MONGO_URL)
  .then(async () => {
    console.log("Connected to MongoDB...");

    // Insert remedies without checking for duplicates
    await RemedyModel.insertMany(remediesData);
    console.log("New remedies added successfully!");

    mongoose.connection.close();
  })
  .catch((err) => console.log(err));
