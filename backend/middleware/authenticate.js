require("dotenv").config();
const jwt = require('jsonwebtoken');
const User = require('../models/user')

const authenticate = async (req, res, next) => {
  if (!('authorization' in req.headers)){
    return res.status(403).json({ message: "Not authorized" });  
  }
  if (!(req.header('authorization').includes('Bearer '))){
    return res.status(403).json({ message: "No Bearer" });  
  }
  const token = req.header('authorization').replace('Bearer ', '');
  
  if (!token) return res.status(401).json({ message: "Access denied" });  
  
  try {
    const secret = process.env.SECRET;
    const decoded = await jwt.verify(token, secret);
    const user = await User.findOne({ _id: decoded.id});

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.token = token;
    req.user = user;
    next();

  } catch (err) {
    res.status(400).json({ message: err });
  }
};

module.exports = { authenticate };