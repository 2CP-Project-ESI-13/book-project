const UserModel = require("../models/user.model.js");
const bcryptjs = require("bcryptjs");
const { errorHandler } = require("../utils/error.js");
const jwt = require("jsonwebtoken");

module.exports.signup = async (req, res, next) => {
  const password = req.body.password;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const user = new UserModel({ ...req.body, password: hashedPassword });
  try {
    await user.save();
    res.status(201).json({ message: "created successfully!" });
  } catch (err) {
    next(errorHandler(err.statusCode, err.message));
  }
};

module.exports.signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      return next(errorHandler(404, "user not found!"));
    }
    const existingPassword = bcryptjs.compareSync(
      password,
      existingUser.password
    );
    if (!existingPassword) {
      return next(errorHandler(401, "wrong credentials!"));
    }
    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = existingUser._doc;
    res.cookie("access_token", token).status(200).json(rest);
  } catch (err) {
    next(err);
  }
};

module.exports.google = async (req, res, next) => {
  try {
    //searching if the user exists in the db
    const user = await UserModel.findOne({ email: req.body.email });

    if (user) {
      //generate a token for the session and save it in the response cookies
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res.cookie("access-token", token).status(200).json(rest);
    } else {
      //creating user if no user is in the db
      //start by creating a new password for him to change it later cuz in the schema it is required:
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new UserModel({
        username: req.body.name.split(" ").join("").toLowerCase(),
        email: req.body.email,
        password: hashedPassword,
        photo: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res.cookie("access_token", token).status(200).json(rest);
    }
  } catch (error) {
    next(error);
  }
};

module.exports.signout = async (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json({ message: "user logged out successfully" });
  } catch (error) {
    next(error);
  }
};
