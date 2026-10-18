
const express = require('express');
const userRouter = express.Router();

const {
  registerUser,
  loginUser,
  getUsers,
  getUser,
} = require('../controller/UserControlller.js');

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/', getUsers);
userRouter.get('/:id', getUser);

module.exports = userRouter;
