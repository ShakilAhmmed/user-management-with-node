const {Category} = require('../models/index');
const {success,error} = require('../helpers/apiResponse')


module.exports.index = async (request, response) => {


    // Category.findAll()
    // .then(data => {
    //     response.send(data);
    // })
    // .catch(err => {
    //     response.status(500).send({
    //     message:
    //       err.message || "Some error occurred while retrieving tutorials."
    //   });
    // });

    try{
        let categories = await Category.findAll();
        response.send(success(categories,'categories fetched successfully')); 
    }catch(exception) {
        console.log(exception)
        response.send(error(exception.message)); 
    }
}


module.exports.store = (request, response) => {
    console.log(request.body); 
}
