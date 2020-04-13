const { Product } = require('../models');

class ProductController {
  static create(req, res, next) {
    const { name, image, price, stock } = req.body;
    Product.create({ name , image, price, stock})
      .then(product => {
        res.status(201).json({product});
      })
      .catch(err => (next(err)));
  }
}

module.exports = ProductController;