const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const app = express();
app.use(fileUpload());

require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const route = require('./router');

app.use('/api/v1/', route);

//Server
app.listen(3000, () => {
  console.log('Server Connected');
});
