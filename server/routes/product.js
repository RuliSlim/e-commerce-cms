const router            = require('express').Router();
const ProductController = require('../controllers/product');
const authenticate      = require('../midlleware/authentication');
const authAdmin         = require('../midlleware/authorization');

router.get('/', ProductController.getAll);
router.post('/', authenticate, authAdmin, ProductController.create);
router.get('/:id', ProductController.getById);
router.put('/:id', authenticate, authAdmin, ProductController.updateById);
router.delete('/:id', authenticate, authAdmin, ProductController.deleteById);

module.exports = router;