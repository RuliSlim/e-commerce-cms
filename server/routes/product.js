const router            = require('express').Router();
const ProductController = require('../controllers/product');
const authenticate      = require('../midlleware/authentication');
const authAdmin         = require('../midlleware/authorization');

// router.get('/', ProductController.getAll);
router.post('/', authenticate, authAdmin, ProductController.create);

module.exports = router;