const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const UserInfoSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: [6, "Please provide give six or grater then cacter"],
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Please provide valid email address"],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },

  role: {
    type: String,
    enum: ["admin", "manager", "candidate"],
    default: "candidate",
    trim: true,
  },
  number: {
    type: String,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
  },
  experience: {
    type: String,
    trim: true,
  },
});

// hashing the password

UserInfoSchema.pre("save", function (next) {
  const password = this.password;

  const hashedPassword = bcrypt.hashSync(password);
  this.password = hashedPassword;
  next();
});

// check password valid or not

UserInfoSchema.methods.comparePassword = (password, hash) => {
  const isValidPassword = bcrypt.compareSync(password, hash);
  return isValidPassword;
};

const UserInfo = mongoose.model("UserInfo", UserInfoSchema, "UserInfo");

module.exports = UserInfo;
