const { Category, SubCategory } = require('../models/index');
const { success, error } = require('../helpers/apiResponse');
const { body, validationResult } = require('express-validator');

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

  try {
    let categories = await Category.findAll({ include: SubCategory });
    return response.status(200).send(success(categories, 'categories fetched successfully'));
  } catch (exception) {
    console.log(exception);
    return response.status(500).send(error(exception.message));
  }
};

module.exports.store = async (request, response) => {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(422).json({ errors: errors.array() });
    }
    let { name, description, status } = request.body;
    const categoryForm = await Category.create({ name, description, status });
    return response.status(201).send(success(categoryForm, 'category created successfully', 201));
  } catch (exception) {
    console.log(exception);
    return response.status(500).send(error(exception.message));
  }
};

module.exports.edit = async (request, response) => {
  try {
    let category = await Category.findOne({
      where: {
        id: request.params.id
      }
    });
    response.send(success(category, 'category fetched successfully'));
  } catch (exception) {
    console.log(exception);
    return response.status(500).send(error(exception.message));
  }
};

module.exports.update = async (request, response) => {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(422).json({ errors: errors.array() });
    }
    let { name, description, status } = request.body;
    const categoryForm = await Category.update(
      { name, description, status },
      {
        where: {
          id: request.params.id
        }
      }
    );
    return response.send(success(categoryForm, 'category updated successfully', 201));
  } catch (exception) {
    console.log(exception);
    return response.status(500).send(error(exception.message));
  }
};

module.exports.destroy = async (request, response) => {
  try {
    const categoryForm = await Category.destroy({
      where: {
        id: request.params.id
      }
    });
    return response.send(success(categoryForm, 'category deleted successfully', 204));
  } catch (exception) {
    console.log(exception);
    return response.status(500).send(error(exception.message));
  }
};

module.exports.validation = () => {
  return [
    body('name', 'Name is Required').exists(),
    body('description', 'Description is Required').exists(),
    body('status', 'Status is Required').exists()
  ];
};
