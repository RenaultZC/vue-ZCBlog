const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');


import user from './routes/user';
import admin from './routes/admin';

let db = mysql.createPool({host:'localhost',user:'web',password:'19980527',database:'blog'})

app.use(bodyParser.urlencoded({extend:false}));
app.use('/api/user',user);
app.use('/api/admin',admin);

app.use('/api/static', express.static('public'));
app.listen(1111);
