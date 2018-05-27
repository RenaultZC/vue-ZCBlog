const express = require('express');
const mysql = require('mysql');

let router = express.Router();
let register = require('../modules/user/register');
let login = require('../modules/user/login');
let activation = require('../modules/user/activation');
let returnJson = require('../modules/returnJson');
let getInfo = require('../modules/user/getInfo');
let updatePassword = require('../modules/user/updatePassword');
let forgetPassword = require('../modules/user/forgetPassword');
let decryption = require('../modules/decryption');
let article = require('../modules/article');
let db = mysql.createPool({host:'localhost',user:'web',password:'*****',database:'blog'});

//register
router.use('/register',(req,res)=>{
    let username,password,callback,result;
    if(req.body.username){
        username = req.body.username;
        password = req.body.password;
        callback = req.body.callback;
    }else if(req.query.username){
        username = req.query.username;
        password = req.query.password;
        callback = req.query.callback;
    }
    password = decryption(password);
    if(username){
        register(req,db,username,password,(result)=>{
            returnJson(res,result,callback);
        });
    }else{
        result = {
            error: true,
            result: '用户名为空'
        };
        returnJson(res,result,callback);
    }
});

//login
router.use('/login',(req,res)=>{
    let email,callback,password,result = null;
    if(req.query.username){
        email = req.query.username;
        callback = req.query.callback;
        password = req.query.password;
    }else if(req.body.username){
        email = req.body.username;
        callback = req.body.callback;
        password = req.body.password;
    }
    password = decryption(password);
    if(email){
        login(req,db,email,password,(result)=>{
            returnJson(res,result,callback);
        })
    }else{
        result = {
            error:true,
            result:"请不要恶意登录"
        };
        returnJson(res,result,callback);
    }
});

//activation
router.use('/activation',(req,res)=>{
    let code,callback,session,email,result = null;
    if(req.query.code){
        code = req.query.code;
        callback = req.query.callback;
        email = req.query.email;
    }else if(req.body.code){
        code = req.body.code;
        callback = req.body.callback;
        email = req.body.email;
    }
    session = req.session['user'];
    if(code && session){
        req.session['user'] = null;
        activation(db,code,session,(result)=>{
            returnJson(res,result,callback);
        })
    }else if(session){
        result = {
            error:true,
            result:"注册失败，请重新注册"
        };
        returnJson(result);
    }else{
        result = {
            error:true,
            result:"注册码已过期或清除cookie"
        }
    }
});

//getInfo
router.use('/getInfo',(req,res)=>{
    let callback,code,email,result;
    if(req.body.code){
        callback = req.body.callback;
        email = req.body.email;
        code = req.body.code;
    }else if(req.query.code){
        callback = req.query.callback;
        email = req.query.email;
        code = req.query.code;
    }
    let sessionUser = req.session['user'];
    if(sessionUser && code){
        if(sessionUser.code === code){
            getInfo(db,sessionUser.email,(result)=>{
                returnJson(res,result,callback);
            });
        }else{
            result = {
                error:true,
                result:"用户登录已经失效，请重新登录"
            };
            returnJson(res,result,callback);
        }

    }else{
        result = {
            error:true,
            result:"用户未登录"
        };
        returnJson(res,result,callback);
    }

});

//updatePassword
router.use('/updatePassword',(req,res)=>{
    let email,code,newPassword,callback,result;
    if(req.body.email){
        newPassword = req.body.newPassword;
        email = req.body.email;
        code = req.body.code;
        callback = req.body.callback;
    }else if(req.query.email){
        email = req.query.email;
        newPassword = req.query.newPassword;
        code = req.query.code;
        callback = req.query.callback;
    }
    newPassword = decryption(newPassword);
    let sessionUser = req.session['user'];
    if(sessionUser && code){
        if(sessionUser.code === code){
            updatePassword(db,email,newPassword,(result)=>{
                returnJson(res,result,callback);
            });
        }else{
            result = {
                error:true,
                result:"验证已过期，请重新申请或登录"
            };
            returnJson(res,result,callback);
        }

    }else{
        result = {
            error:true,
            result:"用户验证未成功"
        };
        returnJson(res,result,callback);
    }
});

//forgetPassword
router.use('/forgetPassword',(req,res)=>{
    let newPassword,email,callback,result = null;
    if(req.body.email){
        email = req.body.email;
        newPassword = req.body.newPassword;
        callback = req.body.callback;
    }else if(req.query.email){
        email = req.query.email;
        newPassword = req.query.newPassword;
        callback = req.query.callback;
    }
    newPassword = decryption(newPassword);
    if(email){
        forgetPassword(req,db,email,newPassword,(result)=>{
            returnJson(res,result,callback);
        })
    }else{
        result = {
            error:true,
            result:"请输入要修改账号和新密码"
        }
    }
});

// article
router.use('/article',article);

module.exports = router;