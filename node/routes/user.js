const express = require('express');
const mysql = require('mysql');

let router = express.Router();
let register = require('../modules/user/register');
let login = require('../modules/user/login');
let activation = require('../modules/user/activation');
let returnJson = require('../modules/returnJson');
let getInfo = require('../modules/user/getInfo');
let db = mysql.createPool({host:'localhost',user:'web',password:'19980527',database:'blog'});

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
    let code,callback,validate,result = null;
    console.log(req.session);
    validate = req.session["validate"];
    if(req.query.code){
        code = req.query.code;
        callback = req.query.callback;
    }else if(req.body.code){
        code = req.body.code;
        callback = req.body.callback;
    }
    if(code && validate){
        req.session['validate'] = null;
        activation(db,code,validate,(result)=>{
            returnJson(res,result,callback);
        })
    }else if(validate){
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
    let callback,code,result;
    if(req.body.code){
        callback = req.body.callback;
        code = req.body.code;
    }else if(req.query.code){
        callback = req.query.callback;
        code = req.query.code;
    }
    let sessionUser = req.session["user"];
    if(sessionUser && code){
        if(sessionUser.code===code){
            getInfo(db,sessionUser.email,(result)=>{
                returnJson(res.result,callback);
            });
        }else{
            result = {
                error:true,
                result:"session不匹配，请勿恶意访问"
            };
            returnJson(res,result,callback);
        }
    }else if(code){
        result = {
            error:true,
            result:"用户未登录"
        };
        returnJson(res,result,callback);
    }else{
        result = {
            error:true,
            result:"用户未登录"
        };
        returnJson(res,result,callback);
    }

});

module.exports = router;