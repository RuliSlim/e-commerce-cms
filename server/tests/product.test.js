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




describe('Product routing', () => {
  beforeAll((done) => {
    request
      .post('/login')
      .send({ email: 'email@email.com', password: 'password' })
      .end((err, response) => {
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('access_token')
        expect(response.body).toHaveProperty('role')
        token = response.body.access_token;
        done();
      });
    });

  // with token
  describe('Create Product', () => {
    it('should create new Product', (done) => {
      return request
      .post('/products')
      .set('access_token', token)
      .send(newProduct)
      .then(response => {
        // console.log(response, 'respones')
          const { body, status } = response;
          expect(status).toBe(201);
          expect(body).toHaveProperty('product');
          done();
        })
    })
  })

  // without token
  describe('Acces denied without token', () => {
    it('should not new Product', (done) => {
      return request
      .post('/products')
      .send(newProduct)
      .then(response => {
          const { body, status } = response;
          expect(status).toBe(401);
          // expect(body).to.be.equal('error');
  //         name: 'JsonWebTokenError',
  // message: 'jwt must be provided'
          expect(body).toHaveProperty('message', 'jwt must be provided');
          done();
        })
    })
  })
  
  // with role customer
  describe('Acces denied', () => {
    beforeAll((done) => {
      request
        .post('/login')
        .send({ email: 'email2@email.com', password: 'password' })
        .end((err, response) => {
          expect(response.status).toBe(200);
          expect(response.body).toHaveProperty('access_token')
          expect(response.body).toHaveProperty('role')
          token = response.body.access_token;
          done();
        });
      });

    describe('user customer trying to create product', () => {
      it('should not new Product', (done) => {
        return request
        .post('/products')
        .set('access_token', token)
        .send(newProduct)
        .then(response => {
            const { body, status } = response;
            expect(status).toBe(401);
            expect(body).toHaveProperty('message', 'Access denied!');
            done();
          })
      })
    })
  })
})