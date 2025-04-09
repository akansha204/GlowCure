require("dotenv").config({ path: "../.env" });
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const { remedyRouter } = require("./routes/remedyRoute");
const { userRouter } = require("./routes/userRoute");
const googleAuthRouter = require("./routes/googleAuth");
const session = require("express-session");
const passport = require("passport");

app.use(
  cors({
    origin: `${process.env.FRONTEND_URL}`,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

require("./config/passportConfig"); // Import Passport config
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// app.use((req, res, next) => {
//   console.log(`Received request: ${req.method} ${req.url}`);
//   next();
// });

app.use("/", remedyRouter);
app.use("/user", userRouter);
app.use("/", googleAuthRouter);

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("connected to db");
  app.listen(3000);
}

main();
