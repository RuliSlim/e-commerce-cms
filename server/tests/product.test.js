
const {app}     = require('../app');
const supertest = require('supertest');
const request   = supertest(app);
const { sequelize } = require('../models');
const { queryInterface } = sequelize;

const newProduct = {
  name: 'Product1',
  image: '',
  price: 5000,
  stock: 10
}
const newProductNegative = {
  name: 'Product1',
  image: '',
  price: -500,
  stock: 10
}
const updateProduct = {
  name: 'Product5',
  image: '',
  price: 5000,
  stock: 10
}

const admin = {
  email: 'email@email.com',
  password: 'password',
  token: null
}

const customer = {
  email: 'email2@email.com', 
  password: 'password',
  token: null
}

describe('Product routing', () => {
  beforeAll((done) => {
    return request
      .post('/login')
      .send(admin)
      .then(response => {
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('access_token')
        expect(response.body).toHaveProperty('role')
        admin.token = response.body.access_token;
        return request
          .post('/login')
          .send(customer)
      })
      .then(response => {
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('access_token')
        expect(response.body).toHaveProperty('role')
        customer.token = response.body.access_token;
        done();
      })
    });

  // with token
  describe('POST /products', () => {
    it('should create new Product', (done) => {
      return request
      .post('/products')
      .set('access_token', admin.token)
      .send(newProduct)
      .then(response => {
        // console.log(response, 'respones')
          const { body, status } = response;
          expect(status).toBe(201);
          expect(body).toHaveProperty('id');
          done();
        })
    })
  })

  // without token
    it('should Acces denied without token', (done) => {
      return request
      .post('/products')
      .send(newProduct)
      .then(response => {
          const { body, status } = response;
          expect(status).toBe(401);
          expect(body).toHaveProperty('message', 'jwt must be provided');
          done();
        })
    })

    // role customer
    it('should not create new Product', (done) => {
      return request
      .post('/products')
      .set('access_token', customer.token)
      .send(newProduct)
      .then(response => {
          const { body, status } = response;
          expect(status).toBe(401);
          expect(body).toHaveProperty('message', 'Access denied!');
          done();
        })
    })

    // price negative
    it('should not create new Product, price negative', (done) => {
      return request
      .post('/products')
      .set('access_token', admin.token)
      .send(newProductNegative)
      .then(response => {
          const { body, status } = response;
          expect(status).toBe(400);
          expect(body).toHaveProperty('message', 'Product price cannot be negative.');
          done();
        })
    })

  // getAll
  describe('GET /products', () => {
    it('should return array of products', done => {
      return request
        .get('/products')
        .then(response => {
          const { status } = response;
          expect(status).toBe(200);
          expect.objectContaining({id: expect.any(Number)});
          done();
        })
    })
  })

  // getOne
  describe('GET /products/:id', () => {
    let id = 1
    it('should return product with id ' + id, done => {
      return request
        .get('/products/' + id)
        .then(response => {
          const { status } = response;
          expect(status).toBe(200);
          expect.objectContaining({id: id});
          done();
        })
    })
    // not found 404
    it('should return status code 404', done => {
      return request
        .get('/products/0')
        .then(response => {
          const { status } = response;
          expect(status).toBe(404);
          expect.objectContaining({message: 'Product not found'});
          done();
        })
    })
  })

  // update
  describe('PUT /products/:id', () => {
    let id = 1
    it('should return updated product with id ' + id, done => {
      return request
        .put('/products/' + id)
        .set('access_token', admin.token)
        .send(updateProduct)
        .then(response => {
          const { status } = response;
          expect(status).toBe(200);
          expect.objectContaining({id: id});
          done();
        })
    })

    // not found 404
    it('should return status code 404', done => {
      return request
        .put('/products/0')
        .set('access_token', admin.token)
        .then(response => {
          const { status } = response;
          expect(status).toBe(404);
          expect.objectContaining({message: 'Product not found'});
          done();
        })
    })

    // acces denied 401
    it('should return status code 401', done => {
      return request
        .put('/products/' + id)
        .set('access_token', customer.token)
        .send(updateProduct)
        .then(response => {
          const { status } = response;
          expect(status).toBe(401);
          expect.objectContaining({message: 'Access denied!'});
          done();
        })
    })
  })

  // delete
  describe('DELETE /products/:id', () => {
    let id = 1
    // not found 404
    it('should return status code 404', done => {
      return request
        .delete('/products/0')
        .set('access_token', admin.token)
        .then(response => {
          const { status } = response;
          expect(status).toBe(404);
          expect.objectContaining({message: 'Product not found'});
          done();
        })
    })

    // acces denied 401
    it('should return status code 401', done => {
      return request
        .delete('/products/' + id)
        .set('access_token', customer.token)
        .send(updateProduct)
        .then(response => {
          const { status } = response;
          expect(status).toBe(401);
          expect.objectContaining({message: 'Access denied!'});
          done();
        })
    })

    // success
    it('should return updated product with id ' + id, done => {
      return request
        .delete('/products/' + id)
        .set('access_token', admin.token)
        .send(updateProduct)
        .then(response => {
          const { status } = response;
          expect(status).toBe(200);
          expect.objectContaining({id: id});
          done();
        })
    })
  })
  // clean db
  afterAll(done => {
    queryInterface
      .bulkDelete('Products', {})
      .then(() => {
        return queryInterface.bulkDelete('Users', {});
      })
      .then(() => done())
      .catch(err => done(err))
  });
})