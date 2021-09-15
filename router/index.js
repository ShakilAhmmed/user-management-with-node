const express = require('express');
const router = express.Router();

// middleware
const auth = require('../middleware/auth');

const homeController = require('../controllers/homeController');
const categoryController = require('../controllers/categoryController');
const subCategoryController = require('../controllers/subCategoryController');
const brandController = require('../controllers/brandController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

router.get('', auth, homeController.index);

router.get('/categories', auth, categoryController.index);
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
router.get('/brands/:id', brandController.edit);
router.delete('/brands/:id', brandController.destroy);

router.get('/users', userController.index);
router.post('/users', userController.validation(), userController.store);
router.get('/users/:id', userController.edit);
router.delete('/users/:id', userController.destroy);

router.post('/auth/login', authController.logInValidation(), authController.login);

module.exports = router;
