const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

//for register
router.post("/register", async (req, res) => {
  try {
    //generate new password with bcrypt 
    const salt = await bcrypt.genSalt(10);
    // hashing the password with our generate Salt.
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create  user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    //save user 
    const user = await newUser.save();
    res.status(200).json(user._id);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// for login 
router.post("/login", async (req, res) => {
  try {
    //find user
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(400).json("Wrong username or password");

    //validate password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(400).json("Wrong username or password");

    //send response
    res.status(200).json({ _id: user._id, username: user.username });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
