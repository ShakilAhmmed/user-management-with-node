const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require("dotenv").config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

const route = require('./router');


app.use('/',route);



//Server
app.listen(3000,()=>{
    console.log('Server Connected');
})