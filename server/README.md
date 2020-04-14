___
## RESTful endpoints
___

### POST /register
##### register new user
___
_Request Body_
```json
{
  "name": "jokocuy",
	"email": "joko@gmail.com",
	"password":"password"
}
```
_Response ( 201 - Succes)_
```json
{
  "access_token": <token>,
  "role": "customer"
}
```
_Response (400 - Validation error)_
```json
{
  "message": [
      "password cannot be null"
  ]
}
```
_Response (400 - Bad Request)_
```json
{
  "message": "User already exists"
}
```
_Response (500 - Server Error)_
```json
{
  "message": "Internal Server Error"
}
```
___
### POST /login
##### login existing user
___

_Request Body_
```json
{
	"email": "joko@gmail.com",
	"password":"password"
}
```

_Response ( 201 )_
```json
{
  "access_token": <token>,
  "role": "customer"
}
```

_Error Response ( 400 - email or password wrong)_
```json
{
  "message": "Email or Password does not match"
}
```

_Error Response ( 404 - user not found )_
```json
{
  "message": "User not found"
}
```
_Response (500 - Server Error)_
```json
{
    "message": "Internal Server Error"
}
```
___
### GET /products
##### get all products craeted by admin
___

_Request Header_
```json
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```json
[
    {
        "id": 1,
        "name": "Product 1",
        "image": "https://avatars1.githubusercontent.com/u/52574133?s=64&v=4",
        "price": 10000,
        "stock": 100,
        "createdAt": "2020-04-14T15:57:58.785Z",
        "updatedAt": "2020-04-14T15:57:58.785Z"
    },
    ...
]
```
_Response (500 - Server Error)_
```json
{
  "message": "Internal Server Error"
}
```

___
### POST /products
##### create new product
___

_Request Header_
```json
{
  "access_token": <token>
}
```

_Request Body_
```json
{
    "name": "Product 2",
    "image": "https://avatars1.githubusercontent.com/u/52574133?s=64&v=4",
    "price": 10000,
    "stock": 100
}
```

_Response (200)_
```json
{
    "id": 2,
    "name": "Product 2",
    "image": "https://avatars1.githubusercontent.com/u/52574133?s=64&v=4",
    "price": 10000,
    "stock": 100,
    "createdAt": "2020-04-14T15:57:58.785Z",
    "updatedAt": "2020-04-14T15:57:58.785Z"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": [
    "name cannot be null",
  ]
}
```
_Response (500 - Server Error)_
```json
{
  "message": "Internal Server Error"
}
```

____________
### GET /products/:id
##### get one products by id
____________
_Request Header_
```json
not needed
```

_Request Params_
```json
{
  "id": 1
}
```

_Request Body_
```json
not needed
```

_Response (200)_
```json
{
    "id": 1,
    "name": "Product 1",
    "image": "https://avatars1.githubusercontent.com/u/52574133?s=64&v=4",
    "price": 10000,
    "stock": 100,
    "createdAt": "2020-04-14T15:57:58.785Z",
    "updatedAt": "2020-04-14T15:57:58.785Z"
}
```
_Response (404 - Not Found)_
```json
{
  "message": "Product not found"
}
```
_Response (500 - Server Error)_
```json
{
  "message": "Internal Server Error"
}
```

_________
### PUT /products/:id
##### update existing product
_________
_Request Header_
```json
{
  "access_token": <token>
}
```

_Request Params_
```json
{
  "id": 2
}
```

_Request Body_
```json
{
    "name": "Product 2",
    "image": "https://avatars1.githubusercontent.com/u/52574133?s=64&v=4",
    "price": 10000,
    "stock": 50
}
```

_Response (200)_
```json
[
  1,
  [
    {
        "id": 2,
        "name": "Product 2",
        "image": "https://avatars1.githubusercontent.com/u/52574133?s=64&v=4",
        "price": 10000,
        "stock": 50,
        "createdAt": "2020-04-14T15:57:58.785Z",
        "updatedAt": "2020-04-14T15:57:58.785Z"
    }
  ]
]
```
_Response (404 - Not Found)_
```json
{
  "message": "Product not found"
}
```
_Response (403 - Authorization)_
```json
{
  "message": "You are not authorized"
}
```
_Response (500 - Server Error)_
```json
{
  "message": "Internal Server Error"
}
```

_______________
### DELETE /products/:id
##### delete existing product by id
_______________
_Request Header_
```json
{
  "access_token": <token>
}
```
_Request Params_
```json
{
  "id": 2
}
```

_Request Body_
```
not needed
```
_Response (200)_
```json
{
  "id": 2,
  "name": "Product 2",
  "image": "https://avatars1.githubusercontent.com/u/52574133?s=64&v=4",
  "price": 10000,
  "stock": 100,
  "updatedAt": "2020-04-14T15:57:58.785Z",
  "createdAt": "2020-04-14T15:57:58.785Z"
}
```
_Response (404 - Not Found)_
```json
{
    "message": "Product not found"
}
```
_Response (403 - Authorization)_
```json
{
  "message": "You are not authorized"
}
```
_Response (500 - Server Error)_
```json
{
  "message": "Internal Server Error"
}
```
