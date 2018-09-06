const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

let user = require('./routes/user');
let admin = require('./routes/admin');

let app = express();
let arr = [];

for(let i = 0;i < 100000;i++){
    arr.push('sig_'+Math.random());
}

app.use(bodyParser.urlencoded({extend:false}));
app.use(cookieParser());
app.use(cookieSession({
    name:'key',
    keys:arr,
    maxAge:24*3600*1000,
}));

app.all('*',function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8080');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.header('Access-Control-ALLOW-Credentials', 'true');
    if (req.method == 'OPTIONS') {
        res.send(200); //让options请求快速返回
    }
    else {
        next();
    }
});
app.use('/api/user',user);
app.use('/api/admin',admin);
app.use('/api/static', express.static('static'));

app.listen(1234);

