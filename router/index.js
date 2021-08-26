const express = require('express')
const router = express.Router();

const homeController = require('../controllers/homeController');
const categoryController = require('../controllers/categoryController');

router.get('',homeController.index);


router.get('/categories',categoryController.index);
router.post('/categories',categoryController.store);
router.get('/categories/:id',categoryController.edit);
router.put('/categories/:id',categoryController.update);
router.delete('/categories/:id',categoryController.destroy);




module.exports = router;