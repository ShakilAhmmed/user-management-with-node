
module.exports.index = (request, response) => {
    let apiResponse = {
        message:'Server Running from controller ',
        code:200
    }
    response.send(apiResponse); 
}
