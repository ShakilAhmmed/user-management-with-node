const { TOKEN_KEY } = require('../constants/configConst');
const jwt = require('jsonwebtoken');
const { success, error } = require('../helpers/apiResponse');

const verifyToken = (request, response, next) => {
  const token = request.body.token || request.query.token || request.headers['x-access-token'];
  if (!token) {
    return response.status(403).send(error('Please provice token for authentication', 403));
  }
  try {
    const tokenVerify = jwt.verify(token, TOKEN_KEY);
    request.user = tokenVerify;
  } catch (exception) {
    console.log(exception);
    return response.status(500).send(error(exception.message));
  }
  return next();
};

module.exports = verifyToken;
