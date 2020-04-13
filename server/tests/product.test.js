const {app}     = require('../app');
const supertest = require('supertest');
const request   = supertest(app);

const newProduct = {
  name: 'Product1',
  image: '',
  price: 5000,
  stock: 10
}

let token = null


beforeAll((done) => {
  request
    .post('/login')
    .send({ email: 'email@email.com', password: 'password' })
    .end((err, response) => {
      console.log('beforeAll')
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('access_token')
      expect(response.body).toHaveProperty('role')
      token = response.body.access_token;
      done();
    });
  });

describe('Product routing', () => {
  describe('Create Product', () => {
    it('should create new Product', (done) => {
      return request
      .post('/products')
      .set('access_token', token)
      .send(newProduct)
      .then(response => {
        console.log(token, 'Ini token')
          const { body, status } = response;
          // console.log(response)
          // console.log(newProduct)
          expect(status).toBe(201);
          expect(body).toHaveProperty('product');
          done();
        })
    })
  })
})