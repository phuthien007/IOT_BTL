// router user
const express = require("express");
const UserModel = require("../models/user.server.model");
const HomeModel = require("../models/home.server.model");
const { checkLogin } = require("../middlewares");
const { compare } = require("bcryptjs");
const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const { Console } = require("console");

const router = express.Router();

const login = async (req, res) => {
  try {
    const uname = req.body.username;
    const pass = req.body.password;
    const user = await UserModel.findOne({
      username: uname,
    });
    console.log(user);
    if (user == null) {
      return res.status(400).json({ message: "Cannot find user" });
    }
    // user.comparePassword(req.body.password, user.password, (err, isMatch) => {
    //   if (err) {
    //     return res.status(400).json({ message: err });
    //   }

    //   if (isMatch) {
    //     return res.status(200).json({
    //       message: "Login successfully",
    //       accessToken: user.generateAuthToken(),
    //     });
    //   }
    //   return res.status(400).json({ message: req.body.password });
    // });
    const isCorrectPassword = await compare(pass, user.password);
    if (!isCorrectPassword) {
      console.log(isCorrectPassword);
      return res.status(400).json({ message: "Wrong password" });
    }
    const token = user.generateAuthToken();
    user.password = null;
    return res.json({
      message: "Login successfully ",
      data: {
        user,
        password: null,
        token: token,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const register = async (req, res) => {
  const user = new UserModel(req.body);
  try {
    if (res.home != null) {
      if (res.home.statusRegister === true) {
        res.status(400).json({ message: "Nhà đã được đăng ký tài khoản" });
      } else {
        user.home = res.home._id;
        const newUser = await user.save();
        res.home.statusRegister = true;
        res.home.statusUse = true;

        res.home.save();
        res.home = null;
        res.status(201).json(newUser);
      }
    } else {
      res.status(400).json({ message: "Khong tim thay nha" });
    }
  } catch (err) {
    console.log("loi dang ki");
    res.status(400).json({ message: err.message });
  }
};

const loadCurrentUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// login
router.post("/login", login);

// setup endpoint create user
router.post("/signup", getHome, register);
// load current user
router.get("/me", checkLogin, loadCurrentUser);

// setup endpoint get all user
router.get("/", checkLogin, async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// setup endpoint get user by id
router.get("/:id", checkLogin, getUser, (req, res) => {
  res.json(res.user);
});

// setup endpoint create user
router.post("/", checkLogin, async (req, res) => {
  const user = new UserModel(req.body);
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    console.log("loi dang ki");
    res.status(400).json({ message: err.message });
  }
});

// setup endpoint update user
router.patch("/:id", checkLogin, getUser, async (req, res) => {
  if (req.body.name != null) {
    res.user.name = req.body.name;
  }
  if (req.body.email != null) {
    res.user.email = req.body.email;
  }
  if (req.body.password != null) {
    res.user.password = req.body.password;
  }
  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// setup endpoint delete user
router.delete("/:id", checkLogin, getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: "Deleted User" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// middleware get user by id
async function getUser(req, res, next) {
  let user;
  try {
    user = await UserModel.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "Cannot find user" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
}

// middleware get home by id
async function getHome(req, res, next) {
  let home;
  try {
    if (req.body.code) {
      console.log(req.body);
      home = await HomeModel.findOne({ code: req.body.code });
      console.log("dfalds", home);
      if (home == null) {
        return res.status(404).json({ message: "Cannot find home" });
      }
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.home = home;
  next();
}

module.exports = router;
