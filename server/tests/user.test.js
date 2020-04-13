// const {app}     = require('../app');
// const supertest = require('supertest');
// const request   = supertest(app);

// describe('User routes testing', () => {
//   describe('User tests', () => {
//     it('should return message pass', () => {
//       request.get('/users')
//         .then(response => {
//           expect(response.status).toBe(200);
//           expect(response.body).toBe('pass');
//         })
//     })
//   })

//   describe('User register', () => {
//     it('should return object', () => {
//       return request
//       .post('/user')
//       .send({
//         email: 'user@example.com',
//         name: 'name',
//         password: 'password'
//       })
//         .then(response => {
//           expect(response.status).toBe(201);
//           expect(response.body).toHaveProperty('id')
//           expect(response.body).toHaveProperty('role')
//           done();
//         })
//         // .catch(err => () => {
//         //   done(err);
//         // })
//     })
//   })
// })