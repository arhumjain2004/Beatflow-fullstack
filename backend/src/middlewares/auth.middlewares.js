const jwt = require("jsonwebtoken");

function getToken(req) {
  if (req.headers.authorization) {
    return req.headers.authorization.split(" ")[1];
  }

  if (req.cookies.token) {
    return req.cookies.token;
  }

  return null;
}

async function authArtist(req, res, next) {
  const token = getToken(req);

  if (!token) {
    return res.status(401).json({ message: "unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "artist") {
      return res.status(403).json({ message: "You don't have access" });
    }

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "unauthorized" });
  }
}

async function authUser(req, res, next) {
  const token = getToken(req);

  if (!token) {
    return res.status(401).json({ message: "unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "user") {
      return res.status(403).json({ message: "You don't have access" });
    }

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "unauthorized" });
  }
}

module.exports = { authArtist, authUser };