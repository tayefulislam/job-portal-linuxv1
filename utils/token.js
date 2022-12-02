const jwt = require("jsonwebtoken");

exports.generateToken = (user) => {
  const payload = {
    email: user?.email,
    id: user?.id,
    role: user?.role,
  };

  const privateKey = process.env.SECRET_TOKEN;

  const token = jwt.sign(payload, privateKey, {
    expiresIn: "7days",
  });
  return token;
};
