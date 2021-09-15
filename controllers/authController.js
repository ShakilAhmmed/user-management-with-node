const { User } = require('../models/index');
const { success, error } = require('../helpers/apiResponse');
const { TOKEN_KEY } = require('../constants/configConst');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports.login = async (request, response) => {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(422).json({ errors: errors.array() });
    }
    let { email, password } = request.body;
    const getUser = await User.findOne({
      where: {
        email
      }
    });
    if (!getUser) {
      return response.status(400).send(error('User not exists', 400));
    }
    let encryptPassword = await bcrypt.compare(password, getUser.password);
    if (!encryptPassword) {
      return response.status(400).send(error('Password not matched', 400));
    }
    let payload = {
      user_id: getUser.id,
      email
    };
    let additional = { expiresIn: '7days' };
    const token = jwt.sign(payload, TOKEN_KEY, additional);
    let userInfo = {
      user: getUser,
      token
    };
    return response.status(200).send(success(userInfo, 'logged in successfully', 200));
  } catch (exception) {
    console.log(exception);
    return response.status(500).send(error(exception.message));
  }
};

module.exports.logInValidation = () => {
  return [
    body('email', 'Email Is Required').exists(),
    body('password', 'Password Is Required').exists()
  ];
};
