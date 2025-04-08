const { Router } = require("express");
const {
  UserModel,
  SuggestionModel,
  RemedyModel,
  UserLikedModel,
} = require("../db");
const { z } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userMiddleware } = require("../middlewares/user");
const { loginSchema, signUpSchema } = require("../schema/zodSchema");

const userRouter = Router();

userRouter.post("/signup", async function (req, res) {
  //safeParse() is better than parse() because it allows us to handle the error in a better way. And it contains success and error fields.
  const parsedDataWithSuccess = signUpSchema.safeParse(req.body);

  if (!parsedDataWithSuccess.success) {
    const formattedErrors = Object.fromEntries(
      Object.entries(parsedDataWithSuccess.error.format()).map(
        ([key, value]) => [key, value._errors]
      )
    );

    return res.status(400).json({
      success: false,
      errors: formattedErrors,
    });
  }

  const { firstName, lastName, email, password } = req.body;

  const userSignedup = await UserModel.findOne({ email: email });
  if (userSignedup) {
    return res.status(400).json({
      success: false,
      message: "User already exists. Kindly login",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 5);

  try {
    const user = await UserModel.create({
      email: email,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
    });
    const token = jwt.sign(
      {
        id: user._id.toString(),
      },
      process.env.JWT_USER_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // user.token = token;
    // await user.save();

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, //7days
    });
    res.status(201).json({
      success: true,
      message: "Signup successful, logged in automatically",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

userRouter.post("/login", async function (req, res) {
  try {
    const validationResult = loginSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password", // General error instead of detailed Zod errors
      });
    }

    const { email, password } = validationResult.data;

    const user = await UserModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exist. Kindly Signup",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect credentials",
      });
    }

    if (user.token) {
      return res
        .cookie("token", user.token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "Lax",
        })
        .json({ success: true, message: "Logged in successfully" });
    }

    const token = jwt.sign(
      {
        id: user._id.toString(),
      },
      process.env.JWT_USER_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true, // Prevents client-side JavaScript access
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax", // Protects against CSRF attacks
      maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expires in 7 days
    });
    res.json({ success: true, message: "Logged in successfully" });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

userRouter.get("/auth-status", async (req, res) => {
  try {
    // Check if user is logged in via Google OAuth (session-based auth)
    if (req.user) {
      return res.json({ user: req.user, isAuthenticated: true }); // Directly return session user
    }
    const token = req.cookies.token; // Get token from cookies

    if (!token) {
      return res.status(401).json({
        message: "Not logged in or session expired",
        isAuthenticated: false,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_USER_SECRET); // Verify token
    const user = await UserModel.findById(decoded.id).select(
      "firstName lastName email"
    );

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", isAuthenticated: false });
    }

    res.json({ user, isAuthenticated: true }); // ✅ Fixed response format
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ message: "Invalid token", isAuthenticated: false });
  }
});

userRouter.post("/logout", (req, res) => {
  res.clearCookie("token", { httpOnly: true, sameSite: "None", secure: true });
  return res.json({ message: "Logged out successfully" });
});

userRouter.post("/forgot-password", async (req, res) => {});

userRouter.post("/reset-password", async (req, res) => {});

userRouter.post("/suggestion", userMiddleware, async function (req, res) {
  try {
    const { title, products, benefits, directions, skipItem, notes } = req.body;
    function compareProductNames(products1, products2) {
      if (!Array.isArray(products1) || !Array.isArray(products2)) {
        return false;
      }
      let names1 = products1.map((p) => p.name.toLowerCase().trim()).sort();
      let names2 = products2.map((p) => p.name.toLowerCase().trim()).sort();
      return JSON.stringify(names1) === JSON.stringify(names2);
    }

    // first check b/w users suggestion
    const userExistRemedy = await SuggestionModel.find();
    const duplicateFound = userExistRemedy.some((suggestion) => {
      return compareProductNames(suggestion.products, products);
    });

    if (duplicateFound) {
      return res.status(400).json({
        message: "Sorry, this suggestion has already been made.",
      });
    }
    console.log("first check done");

    // second check b/w users and app.
    const existRemedy = await RemedyModel.find();
    const duplicateRemedy = existRemedy.find((remedy) =>
      compareProductNames(remedy.products, req.body.products)
    );
    if (duplicateRemedy) {
      return res
        .status(400)
        .json({ message: "Sorry, it already exists in our DB." });
    }

    console.log("2nd check done");

    await SuggestionModel.create({
      title,
      products,
      benefits,
      directions,
      skipItem,
      notes,
    });
    res.json({
      message: "Suggestion created successfully",
    });
  } catch (err) {
    console.log(err);
  }
});

//Below is the user liked/unliked get-liked remedies logic.
userRouter.post("/like/:remedyId", userMiddleware, async (req, res) => {
  try {
    const { remedyId } = req.params;
    const userId = req.user.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Check if the remedy exists
    const remedy = await RemedyModel.findById(remedyId);
    if (!remedy) {
      return res.status(404).json({ message: "Remedy not found" });
    }

    // Check if the user has already liked the remedy
    const existingLike = await UserLikedModel.findOne({ userId, remedyId });
    if (existingLike) {
      return res.status(400).json({ message: "Remedy already liked" });
    }

    // Create a new UserLikedRemedy document
    await UserLikedModel.create({ userId, remedyId });

    res.status(200).json({ message: "Remedy liked successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
    console.log(error);
  }
});

userRouter.delete("/unlike/:remedyId", userMiddleware, async (req, res) => {
  try {
    const { remedyId } = req.params;
    const userId = req.user.id;

    // Delete the UserLikedRemedy document
    await UserLikedModel.findOneAndDelete({ userId, remedyId });

    res.status(200).json({ message: "Remedy unliked successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

//below is the pagination concept .
userRouter.get("/liked-remedies", userMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const likedRemedies = await UserLikedModel.find({ userId })
      .populate({
        path: "remedyId",
        select: "title products benefits directions skipItem notes",
      })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({ likedRemedies });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
    console.log(error);
  }
});

module.exports = {
  userRouter,
};
