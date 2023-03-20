const jwt = require("jsonwebtoken");

const JWT_SECRET = "NaiduGr!!!";
const fetchuser = (req, res, next) => {
  //get the user from the jwt token and add id to req object
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send({ error: "please authenticate valid token" });
  }
  try {
    const decode = jwt.verify(token, JWT_SECRET);
    req.user = decode.userId;
    console.log(decode);
    next();
  } catch (error) {
    return res.status(401).send({ error: "please authenticate valid token" });
  }
};

module.exports = fetchuser;
