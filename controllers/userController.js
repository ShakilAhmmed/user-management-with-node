const { User } = require('../models/index');
const { success, error } = require('../helpers/apiResponse');
const { TOKEN_KEY } = require('../constants/configConst');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports.index = async (request, response) => {
  try {
    let users = await User.findAll();
    return response.status(200).send(success(users, 'user fetched successfully'));
  } catch (exception) {
    return response.status(500).send(error(exception.message));
  }
};

module.exports.store = async (request, response) => {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(422).json({ errors: errors.array() });
    }
    let { name, email, password, status } = request.body;
    let encryptPassword = await bcrypt.hash(password, 10);
    const userForm = await User.create({ name, email, password: encryptPassword, status });
    let payload = {
      user_id: userForm.id,
      email
    };
    let additional = { expiresIn: '7days' };
    const token = jwt.sign(payload, TOKEN_KEY, additional);
    let userInfo = {
      user: userForm,
      token
    };
    return response.status(201).send(success(userInfo, 'user created successfully', 201));
  } catch (exception) {
    console.log(exception);
    return response.status(500).send(error(exception.message));
  }
};

module.exports.edit = async (request, response) => {
  return response.status(200).send(success([], 'user fetched successfully'));
};

module.exports.destroy = async (request, response) => {
  return response.status(200).send(success([], 'user fetched successfully'));
};

module.exports.validation = () => {
  return [
    body('name', 'Name is Required').exists(),
    body('email', 'Email is Required')
      .exists()
      .custom((value) => {
        if (value) {
          return User.findOne({ where: { email: value } }).then((user) => {
            if (user) {
              return Promise.reject('Email is Taken');
            }
          });
        }
      }),
    body('email', 'Must be valid email').normalizeEmail().isEmail(),
    body('password', 'Password is Required').exists(),
    body('status', 'Status is Required').exists()
  ];
};
