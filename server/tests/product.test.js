const {app}     = require('../app');
const supertest = require('supertest');
const request   = supertest(app);
const jwt       = require('jsonwebtoken');

const newProduct = {
  name: 'Product1',
  image: 'https://avatars2.githubusercontent.com/u/31114577?s=40&v=4',
  price: 5000,
  stock: 10
}

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJTZXJ2ZXIiLCJpZCI6ImEzYTI1Mjk4LThhYWYtNGQ2OS05MzRiLTdjMGMyYmUwMDNiMCIsImlhdCI6MTU4Njc5MDY4Njk3NiwiZXhwIjoxNTg2NzkwNzczMzc2fQ.1_DAhOvJFqTZHGlFtXy6gErgazxqKUSV6fVfdx2pA2c'

// beforeAll(async () => {
//   describe('Login as admin', () => {
//     it('should login as admin', () => {
//       return request
//         .post('/login')
//         .send({ email: 'email@email.com', password: 'password'})
//         .then(response => {
//           expect(response.status).toBe(200);
//           expect(response.body).toHaveProperty('access_token')
//           expect(response.body).toHaveProperty('role')
//           token = response.body.access_token;
//           done();
//         })
//       })
//     })
//   });

describe('Product routing', () => {
  describe('Create Product', () => {

    // // login
    // before(describe('Login as admin', () => {
    //   it('should login as admin', () => {
    //     return request
    //       .post('/login')
    //       .send({ email: 'email@email.com', password: 'password'})
    //       .then(response => {
    //         expect(response.status).toBe(200);
    //         expect(response.body).toHaveProperty('access_token')
    //         expect(response.body).toHaveProperty('role')
    //         console.log(response.body, 'ini body coooy')
    //         token = response.body.access_token;
    //         done();
    //       })
    //     })
    //   }))


    console.log('ini token', token)


    it('should create new Product', () => {
      return request
        .post('/products')
        .set('access_token', token)
        .send(newProduct)
        .then(response => {
          expect(response.status).toBe(200);
          expect(response.body).toHaveProperty('product');
          done();
        })
    })
  })
})