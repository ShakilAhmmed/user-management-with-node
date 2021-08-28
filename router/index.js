const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');
const categoryController = require('../controllers/categoryController');
const subCategoryController = require('../controllers/subCategoryController');
const brandController = require('../controllers/brandController');

router.get('', homeController.index);

router.get('/categories', categoryController.index);
router.post('/categories', categoryController.validation(), categoryController.store);
router.get('/categories/:id', categoryController.edit);
router.put('/categories/:id', categoryController.validation(), categoryController.update);
router.delete('/categories/:id', categoryController.destroy);

router.get('/sub-categories', subCategoryController.index);
router.post('/sub-categories', subCategoryController.validation(), subCategoryController.store);
router.get('/sub-categories/:id', subCategoryController.edit);
router.put('/sub-categories/:id', subCategoryController.validation(), subCategoryController.update);
router.delete('/sub-categories/:id', subCategoryController.destroy);

router.get('/brands', brandController.index);
router.post('/brands', brandController.validation(), brandController.store);

module.exports = router;
