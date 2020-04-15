const { Product } = require('../models');
const ErrorCustom  = require('../midlleware/errorHandler');

class ProductController {
  static getAll(req, res, next) {
    console.log('masuk ga cuy?')
    Product.findAll()
      .then(products => {
        res.status(200).json(products);
      })
      .catch(err => next(err));
  }

  static create(req, res, next) {
    const { name, image, price, stock } = req.body;
    Product.create({ name , image, price, stock})
      .then(product => {
        res.status(201).json(product);
      })
      .catch(err => (next(err)));
  }

  static getById(req, res, next) {
    const { id } = req.params;
    Product.findOne({where: {id}})
      .then(product => {
        if(!product) {
          throw new ErrorCustom({
            name: 'ItemNotFound',
            status: 404,
            message: 'Product with id ' + id + ' Not Found'
          });
        }
        res.status(200).json(product);
      })
      .catch(err => (next(err)));
  }

  static updateById(req, res, next) {
    const { id } = req.params;
    const { name , image, price, stock } = req.body;
    Product.findByPk(id)
      .then(product => {
        if(!product) {
          throw new ErrorCustom({
            name: 'ItemNotFound',
            status: 404,
            message: 'Product with id ' + id + ' Not Found'
          });
        }
        return Product.update({ name , image, price, stock }, {where: {id}, returning: true});
      })
      .then(product => {
        res.status(200).json(product);
      })
      .catch(err => next(err));
  }

  static deleteById(req, res, next) {
    const { id } = req.params;
    let foundProduct;
    Product.findByPk(id)
      .then(product => {
        if(!product) {
          throw new ErrorCustom({
            name: 'ItemNotFound',
            status: 404,
            message: 'Product with id ' + id + ' Not Found'
          });
        }
        foundProduct = product
        return Product.destroy({where: {id}});
      })
      .then(product => {
        res.status(200).json(foundProduct);
      })
      .catch(err => next(err));
  }
}

module.exports = ProductController;