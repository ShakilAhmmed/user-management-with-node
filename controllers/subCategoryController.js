const { Category, SubCategory } = require('../models/index');
const { success, error } = require('../helpers/apiResponse');
const { body, validationResult } = require('express-validator');

module.exports.index = async (request, response) => {
  try {
    let subCategories = await SubCategory.findAll({ include: Category });
    response.status(200).send(success(subCategories, 'sub-categories fetched successfully'));
  } catch (exception) {
    console.log(exception);
    response.send(error(exception.message));
  }
};

module.exports.store = async (request, response) => {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      response.status(422).json({ errors: errors.array() });
      return;
    }
    let { name, category_id, description, status } = request.body;
    const subCategoryForm = await SubCategory.create({ name, category_id, description, status });
    response.status(201).send(success(subCategoryForm, 'sub-category created successfully', 201));
  } catch (exception) {
    console.log(exception);
    response.send(error(exception.message));
  }
};

module.exports.edit = async (request, response) => {
  try {
    let subCategory = await SubCategory.findOne(
      { include: Category },
      {
        where: {
          id: request.params.id
        }
      }
    );
    response.send(success(subCategory, 'sub-category fetched successfully'));
  } catch (exception) {
    console.log(exception);
    response.send(error(exception.message));
  }
};

module.exports.update = async (request, response) => {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      response.status(422).json({ errors: errors.array() });
      return;
    }

    let { name, category_id, description, status } = request.body;
    const subCategoryForm = await SubCategory.update(
      { name, category_id, description, status },
      {
        where: {
          id: request.params.id
        }
      }
    );
    response.send(success(subCategoryForm, 'sub-category updated successfully', 201));
  } catch (exception) {
    console.log(exception);
    response.send(error(exception.message));
  }
};

module.exports.destroy = async (request, response) => {
  try {
    const subCategory = await SubCategory.destroy({
      where: {
        id: request.params.id
      }
    });
    response.send(success(subCategory, 'sub-category deleted successfully', 204));
  } catch (exception) {
    console.log(exception);
    response.send(error(exception.message));
  }
};

module.exports.validation = () => {
  return [
    body('name', 'Name is Required').exists(),
    body('category_id', 'Category is Required').exists(),
    body('description', 'Description is Required').exists(),
    body('status', 'Status is Required').exists()
  ];
};
