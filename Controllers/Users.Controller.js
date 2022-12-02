const {
  createUserService,
  isUserService,
  getAllUserService,
  getMeService,
  getAllManagerService,
} = require("../Services/Users.Service");

const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/token");

exports.createUser = async (req, res, next) => {
  try {
    const newUser = req.body;

    const createNewUser = await createUserService(newUser);
    res.status(200).json({
      status: "success",
      message: "Successfuly created new user",
      createNewUser,
    });
  } catch (error) {
    res.status(401).json({
      status: "failed",
      message: "Could not create the user",
      error: error.message,
    });
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const isUser = await isUserService(email);
    // email and password esits or not

    console.log(isUser);

    if (!email || !password) {
      return res.status(401).json({
        status: "failed",
        message: "Please give email and password",
      });
    }

    // check user exsit in database
    if (!isUser) {
      return res.status(401).json({
        status: "failed",
        message: "User not found",
      });
    }

    const isValidPassword = bcrypt.compareSync(password, isUser.password);
    // check password is correct or not by useiing methods instance in model
    if (!isValidPassword) {
      return res.status(401).json({
        status: "failed",
        message: "Password is not correct",
      });
    }

    const token = generateToken(isUser);

    const { password: dataPassword, ...others } = isUser.toObject();

    res.status(200).json({
      status: "success",
      message: "login succesful",
      result: { others, token },
    });
  } catch (error) {
    res.status(403).json({
      status: "failed",
      message: "failed to login",
      error: error.message,
    });
  }
};

exports.getAllUser = async (req, res) => {
  try {
    const result = await getAllUserService();

    res.status(200).json({
      status: "success",
      result: result,
    });
  } catch (error) {
    res.status(401).json({
      status: "failed",
      message: "failed to load fetch data",
      error: error.message,
    });
  }
};

exports.getMe = async (req, res) => {
  const { email } = req.user;
  const user = await getMeService(email);
  try {
    res.status(200).json({
      status: "success",
      message: "successfully get data",
      user,
    });
  } catch (error) {
    res.status(401).json({
      status: "failed",
      message: "error",
    });
  }
};

// extra route

exports.getAllManager = async (req, res) => {
  try {
    const result = await getAllManagerService();
    res.status(200).json({
      status: "success",
      message: "successfully load data",
      result,
    });
  } catch (error) {
    res.status(401).json({
      status: "failed",
      message: "faild to load data",
      error: error.message,
    });
  }
};
