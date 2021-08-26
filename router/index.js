const express = require('express')
const router = express.Router();

const homeController = require('../controllers/homeController');
const categoryController = require('../controllers/categoryController');

router.get('',homeController.index);
router.get('/categories',categoryController.index);
router.post('/categories',categoryController.store);




module.exports = router;