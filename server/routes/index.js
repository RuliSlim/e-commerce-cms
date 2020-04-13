const router = require('express').Router();

router.use('/', require('./user'));
router.use('/products', require('./product'));

module.exports = router;