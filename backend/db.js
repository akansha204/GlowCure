const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const remedySchema = new Schema({
  title: { type: String, required: true },
  products: [
    {
      name: { type: String, required: true },
      quantity: { type: String },
    },
  ],
  benefits: { type: String },
  directions: { type: String, required: true },
  skipItem: { type: String },
  notes: { type: String },
});

const userSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: function () {
      return !this.googleId;
    },
    select: false,
  },
  googleId: { type: String, unique: true, sparse: true }, // For Google Auth users
  profilePicture: { type: String },
});
const userLikedRemedySchema = new mongoose.Schema({
  userId: { type: ObjectId, ref: "User", required: true },
  remedyId: { type: ObjectId, ref: "Remedy", required: true },
});

const SuggestionSchema = new Schema({
  images: { type: String },
  title: { type: String, required: true },
  products: [
    {
      name: { type: String, required: true },
      quantity: { type: String },
    },
  ],
  benefits: { type: String },
  directions: { type: String, required: true },
  skipItem: { type: String },
  notes: { type: String },
});

const RemedyModel = mongoose.model("Remedy", remedySchema);
const UserModel = mongoose.model("User", userSchema);
const UserLikedModel = mongoose.model("UserLiked", userLikedRemedySchema);
const SuggestionModel = mongoose.model("Suggestion", SuggestionSchema);

module.exports = {
  RemedyModel,
  UserModel,
  UserLikedModel,
  SuggestionModel,
};
