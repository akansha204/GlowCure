const { Router } = require("express");
const { RemedyModel } = require("../db");

const remedyRouter = Router();

remedyRouter.get("/get-remedies", async (req, res) => {
  console.log("API hit with query:", req.query); // Debug log
  try {
    const { search } = req.query;
    let remedies;

    if (search) {
      // Replace spaces and hyphens to handle different formats
      const normalizedSearch = search.replace(/\s+/g, "[-\\s]"); // Matches space or hyphen
      remedies = await RemedyModel.find({
        title: { $regex: normalizedSearch, $options: "i" }, // Case-insensitive, flexible match
      });
    } else {
      remedies = await RemedyModel.find();
    }

    res.json(remedies);
  } catch (err) {
    console.error("Error fetching remedies:", err);
    res.status(500).json({ message: err.message });
  }
});
module.exports = {
  remedyRouter,
};
