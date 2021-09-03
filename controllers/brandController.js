const { Brand } = require('../models/index');
const { success, error } = require('../helpers/apiResponse');
const { body, validationResult } = require('express-validator');
const { request, response } = require('express');
const fileSystem = require('fs');

module.exports.index = async (request, response) => {
  try {
    let brand = await Brand.findAll();
    response.status(200).send(success(brand, 'brands fetched successfully'));
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
    let { name, email, slug, phone, address, status } = request.body;
    let { icon } = request.files;
    if (icon) {
      icon = __dirname + '/public/asstes/images/brands/' + icon.name;
      sampleFile.mv(icon, function (fileUploadError) {
        if (fileUploadError) {
          response.send(error(fileUploadError.message));
        }
      });
    }

    const brandForm = await Brand.create({ name, email, icon, slug, phone, address, status });
    response.status(201).send(success(brandForm, 'brand created successfully', 201));
  } catch (exception) {
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

    let { name, email, slug, phone, address, status } = request.body;
    let { icon } = request.files;
    if (icon) {
      //fileSystem.unlink();
      icon = __dirname + '/public/asstes/images/brands/' + icon.name;
      sampleFile.mv(icon, function (fileUploadError) {
        if (fileUploadError) {
          response.send(error(fileUploadError.message));
        }
      });
    }
    const brandForm = await SubCategory.update(
      { name, email, icon, slug, phone, address, status },
      {
        where: {
          id: request.params.id
        }
      }
    );
    response.send(success(brandForm, 'brand updated successfully', 201));
  } catch (exception) {
    console.log(exception);
    response.send(error(exception.message));
  }
};

module.exports.edit = async (request, response) => {
  try {
    let brand = await Brand.findOne({
      where: {
        id: request.params.id
      }
    });
    response.send(success(brand, 'brand fetched successfully'));
  } catch (exception) {
    console.log(exception);
    response.send(error(exception.message));
  }
};

module.exports.destroy = async (request, response) => {
  try {
    const brand = await Brand.destroy({
      where: {
        id: request.params.id
      }
    });
    response.send(success(brand, 'brand deleted successfully', 204));
  } catch (exception) {
    console.log(exception);
    response.send(error(exception.message));
  }
};

module.exports.validation = () => {
  return [
    body('name', 'Name is Required').exists(),
    body('email', 'Email is Required').exists(),
    body('email', 'Must be valid email').normalizeEmail().isEmail(),
    body('slug', 'Slug is Required')
      .exists()
      .custom((value) => {
        if (value) {
          return Brand.findOne({ where: { slug: value } }).then((brand) => {
            if (brand) {
              return Promise.reject('Slug is Taken');
            }
          });
        }
      }),
    body('status', 'Status is Required').exists()
  ];
};
