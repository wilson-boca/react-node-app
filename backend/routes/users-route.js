const express = require('express');
const { check } = require('express-validator');
const { authenticate } = require('../middleware/authenticate');


const userController = require('../controllers/users-controller');

const router = express.Router();

router.post('/auth/login', userController.login);

router.post('/auth/logout', userController.logout);

router.get('/healthcheck', userController.healthcheck);

router.post(
  '/auth/register',
  [
    check('name')
      .not()
      .isEmpty(),
    check('email')
      .isEmail(),
    check('password').isLength({ min: 6 })
  ], 
  userController.signup);

router.get("/users/me", authenticate, userController.getUser)


module.exports = router;
