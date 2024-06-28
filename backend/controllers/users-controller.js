require("dotenv").config();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator');

const User = require('../models/user')

const secret = process.env.SECRET;

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ message: errors.array() })
  }
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password, salt)

  const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
  })

  try{
    const result = await user.save()
    const {password, ...data} = await result.toJSON()
    return res.send(data)  
  } catch (error){
    if (error.code === 11000){
      return res.status(409).json({ msg: error });
    }
    res.status(500).json({ msg: error });
  }
};

const login =  async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    return res.status(422).json({ message: "Wrong password" });
  }

  try {    
    const token = jwt.sign(
      {
        id: user._id,
      },
      secret
    );
    jsonDict = {
      token,
      name: user.name,
      email: user.email
    }
    res.status(200).json(jsonDict);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const logout = async (req, res) => {
  const token = jwt.sign(
    {},
    secret,
    { expiresIn: '0s'}
  );

  jsonDict = {
    token
  }
  res.status(200).json(jsonDict);
};

const healthcheck = async (req, res) => {
  res.status(200).json({"ping": "pong, everything is okay"});
};

const getUser = async (req, res) => {
  const user = await User.findById(req.user._id, "-password");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }  

  res.status(200).json({ user });
};

exports.signup = signup;
exports.login = login;
exports.logout = logout;
exports.getUser = getUser;
exports.healthcheck = healthcheck;
