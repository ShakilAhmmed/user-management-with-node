module.exports.index = (request, response) => {
  let apiResponse = {
    message: 'Server Running from controller ',
    code: 200
  };
  return response.send(apiResponse);
};
