require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const app = express();
const passport = require("passport");
const session = require("express-session");
app.use(cors({
  origin: [ "https://enginotes.in", "http://www.enginotes.in" ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));
app.options("*", cors());
app.use(express.json());
app.use(session({
  secret: "secretkey",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to true if using HTTPS
}));

app.use(passport.initialize());
app.use(passport.session());

console.log("MONGO_URI:", process.env.MONGO_URI);
// ================= DATABASE =================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// ================= MODELS =================
const Note = require("./models/Note");
const User = require("./models/User");
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "https://enginotes-backend.onrender.com/auth/google/callback"
},
async (accessToken, refreshToken, profile, done) => {

  const email = profile.emails[0].value;

  let user = await User.findOne({ email });

  if (!user) {
    user = new User({
      email,
      password: await bcrypt.hash("google-auth", 10)
    });
    await user.save();
  }

  done(null, user);
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => done(null, { id }));

// ================= AUTH MIDDLEWARE =================
function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send("Login required");
  }

  const token = authHeader.split(" ")[1]; // ✅ extract token

  try {
    const verified = jwt.verify(token, "secretkey123");
    req.user = verified;
    next();
  } catch (err) {
    console.log("JWT ERROR:", err.message);
    res.status(400).send("Invalid token");
  }
}

// ================= ROUTES =================

// Test
app.get("/", (req, res) => {
  res.send("Backend working ");
});

// ================= SIGNUP =================
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).send("User already exists");

  const hashed = await bcrypt.hash(password, 10);

  const user = new User({
    email,
    password: hashed
  });

  await user.save();

  res.send("Signup successful");
});

// ================= LOGIN =================
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).send("User not found");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).send("Wrong password");

  const token = jwt.sign(
    { id: user._id },
    "secretkey123",
    { expiresIn: "7d" }
  );

  res.json({ token });
});

// ================= UPLOAD (PROTECTED) =================
app.post("/upload", auth, async (req, res) => {
  const { subject, branch, semester, link } = req.body;

  if (!link.startsWith("https://drive.google.com/")) {
    return res.status(400).send("Invalid link");
  }

  const note = new Note({
    subject,
    branch,
    semester,
    link
  });

  await note.save();

  res.send("Uploaded successfully");
});

// ================= GET NOTES =================
app.get("/api/notes", async (req, res) => {
  const notes = await Note.find().sort({ createdAt: -1 });

  res.json(notes);
});

// ================= UPDATE DOWNLOAD COUNT =================
app.post("/download/:id", async (req, res) => {
  const { id } = req.params;

  await Note.findByIdAndUpdate(id, { $inc: { downloads: 1 } });

  res.send("Download count updated");
});
// ================= GOOGLE LOGIN =================
app.get("/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get("/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {

    const token = jwt.sign(
      { id: req.user.id },
      "secretkey123",
      { expiresIn: "7d" }
    );

    // redirect to frontend
    res.redirect("https://enginotes.in/index.html?token=" + token);
  }
);
// ================= GET SINGLE NOTE =================
app.get("/note/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) return res.status(404).send("Note not found");

    res.json(note);
  } catch {
    res.status(500).send("Error fetching note");
  }
});
// ================= GET USER PROFILE =================
app.get("/profile", auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json({ email: user.email, points: user.points });
});

// ================= GET MY NOTES =================
app.get("/my-notes", auth, async (req, res) => {
  const notes = await Note.find({ uploaderId: req.user.id })
                          .sort({ createdAt: -1 });
  res.json(notes);
});
// ================= START SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});