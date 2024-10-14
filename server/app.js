require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const path = require("path");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const flash = require("connect-flash");
const ValidRegistration = require("./models/validRegd");
const port = process.env.PORT || 4000;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

const userSchema = new mongoose.Schema({
  regd: Number,
  password: String,
});

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const mongoURL = process.env.MONGO_URI;
mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// mongoose.set("useCreateIndex",true);

app.get("/", (req, res) => {
  let data = {
    name: "Swayam",
    hobbies: ["playing football", "playing chess", "cycling"],
  };

  res.render("home", { data: data });
});

// app.get("/", (req, res) => {
//     res.render("home");
// });

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/secrets", (req, res) => {
  if (req.isAuthenticated()) {
    //Here render the required page later
    res.send("Authorization Complete , This is Protected Page");
  } else {
    res.redirect("/login");
  }
});


app.post("/register", async (req, res) => {
    try {
      // Check if the provided registration number is valid
      const validReg = await ValidRegistration.findOne({ registrationNumber: req.body.username });
  
      if (!validReg) {
        // If the registration number is not found in the valid list
        console.log("Invalid registration number");
        return res.send("Your registration number is not valid. Please contact the administrator.");
      }
  
      // Proceed with user registration if registration number is valid
      User.register(
        {
          username: req.body.username,
          registrationNumber: req.body.registrationNumber,  // Use req.body.username if they are the same
        },
        req.body.password,
        function (err, user) {
          if (err) {
            console.log(err);
            return res.redirect("/register");
          } else {
            passport.authenticate("local")(req, res, function () {
              res.redirect("/secrets");
            });
          }
        }
      );
    } catch (err) {
      console.error(err);
      res.redirect("/register");
    }
  });

app.post("/login", function (req, res) {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  req.login(user, (err) => {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      passport.authenticate("local")(req, res, () => {
        res.redirect("/secrets");
      });
    }
  });
});

// Error handling middleware for login
app.use((err, req, res, next) => {
  if (err.name === "UserNotFound") {
    req.flash("error", "User not found. Please register first."); //
    res.redirect("/register");
  } else {
    next(err);
  }
});

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

app.listen(4000, () => {
  console.log("listening on port 4000");
});
