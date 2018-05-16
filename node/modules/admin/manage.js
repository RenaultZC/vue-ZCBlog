const express = require('express');
let router = express.Router();
const mysql = require('mysql');

let db = mysql.createPool({host:'localhost',user:'web',password:'19980527',database:'blog'});
let returnJson = require('../returnJson');
let add = require('./manage/add');
let deleted = require('./manage/delete');
let search = require('./manage/search');

//add
router.use('/add',(req,res)=>{
    let code,password,flag,username,email,newEmail,session,callback,result =null;
    if(req.body.code){
        code = req.body.code;
        password = req.body.password;
        flag = req.body.flag;
        username = req.body.username;
        email = req.body.email;
        newEmail = req.body.newEmail;
        callback = req.body.callback;
    }else if(req.query.code){
        code = req.query.code;
        password = req.query.password;
        flag = req.query.flag;
        username = req.query.username;
        email = req.query.email;
        newEmail = req.query.newEmail;
        callback = req.query.callback;
    }
    session = req.session[email];
    if(session&&code){
        if(session.code===code){
            add(db,username,newEmail,password,flag,(result)=>{
                returnJson(res,result,callback);
            });
        }else{
            result = {
                error:true,
                result:"身份验证已过期,请重新登陆"
            };
            returnJson(res,result,callback);
        }
    }else{
        result = {
            error:true,
            result:"管理员未登录,请重新登录"
        };
        returnJson(res,result,callback);
    }
});

//delete
router.use('/delete',(req,res)=>{
    let username,code,session,callback,email,result;
    if(req.body.code){
        code = req.body.code;
        email = req.body.email;
        username = req.body.username;
        callback = req.body.callback;
    }else if(req.query.code){
        code = req.query.code;
        email = req.query.email;
        username = req.query.username;
        callback = req.query.callback;
    }
    session = req.session[email];
    if(session&&code){
        if(session.code===code){
            deleted(db,username,(result)=>{
                returnJson(res,result,callback);
            });
        }else{
            result = {
                error:true,
                result:"身份验证已过期,请重新登陆"
            };
            returnJson(res,result,callback);
        }
    }else{
        result = {
            error:true,
            result:"管理员未登录,请重新登录"
        };
        returnJson(res,result,callback);
    }
});

//update
// router.use('/update',(req,res)=>{
//
// });

//search
router.use('/search',(req,res)=>{
    let flag,code,session,callback,email,result;
    if(req.body.code){
        code = req.body.code;
        email = req.body.email;
        flag = req.body.flag;
        callback = req.body.callback;
    }else if(req.query.code){
        code = req.query.code;
        email = req.query.email;
        flag = req.query.flag;
        callback = req.query.callback;
    }
    session = req.session[email];
    if(session&&code){
        if(session.code===code){
            search(db,flag,(result)=>{
                returnJson(res,result,callback);
            });
        }else{
            result = {
                error:true,
                result:"身份验证已过期,请重新登陆"
            };
            returnJson(res,result,callback);
        }
    }else{
        result = {
            error:true,
            result:"管理员未登录,请重新登录"
        };
        returnJson(res,result,callback);
    }
});
module.exports = router;