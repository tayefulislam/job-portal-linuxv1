const jwt = require("jsonwebtoken");
const { promisify } = require("util");

exports.verifyToken = async (req, res, next) => {
  const token = req?.headers?.authorization?.split(" ")?.[1];

  console.log(token);

  try {
    if (!token) {
      return res.status(401).json({
        status: "failed",
        message: "Your are not login",
      });
    }

    const decoded = await promisify(jwt.verify)(
      token,
      process.env.SECRET_TOKEN
    );

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      status: "failed",
      message: "Invalid token",
      error: error.message,
    });
  }
};
