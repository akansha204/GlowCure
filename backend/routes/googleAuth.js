const { Router } = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");
const { UserModel } = require("../db");

require("dotenv").config();

const googleAuthRouter = Router();

googleAuthRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

googleAuthRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  async (req, res) => {
    try {
      let user = await UserModel.findOne({ email: req.user.email });

      if (user) {
        // If user exists but no googleId, update it
        if (!user.googleId) {
          user.googleId = req.user.id;
          await user.save();
        }
      } else {
        user = await UserModel.create({
          firstName: req.user.firstName,
          lastName: req.user.lastName,
          email: req.user.email,
          googleId: req.user.id,
          profilePicture: req.user.profilePicture,
        });
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_USER_SECRET, {
        expiresIn: "7d",
      });

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.redirect(`${process.env.FRONTEND_URL}/`);
    } catch (error) {
      console.error("Google Auth Error:", error);
      res.redirect(`${process.env.FRONTEND_URL}/login?error=OAuthFailed`);
    }
  }
);

googleAuthRouter.get("/logout", async (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.clearCookie("token");
    res.redirect(`${process.env.FRONTEND_URL}/`);
  });
});

module.exports = googleAuthRouter;
