require('dotenv').config();
const express       = require('express');
const app           = express();
const cors          = require('cors');
const PORT          = process.env.PORT || 3000;
const ErrorCustom   = require('./midlleware/errorHandler');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use(require('./routes/index'));
app.use(ErrorCustom.errorHandler);

module.exports = {app, PORT};