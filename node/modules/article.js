const express = require('express');
let router = express.Router();
const mysql = require('mysql');

let db = mysql.createPool({host:'localhost',user:'web',password:'19980527',database:'blog'});
let returnJson = require("./returnJson");
let add = require("./article/add");
let deleted = require("./article/delete");
let search = require("./article/search");
let college = require("./article/college");
let star = require("./article/star");
let getCollege = require("./article/getCollege");
let getStar = require("./article/getStar");

//add
router.use('/add',(req,res)=>{
    let email,title,type,content,callback,code,session,result;
    if(req.body.code){
        code = req.body.code;
        title = req.body.title;
        type = req.body.type;
        content = req.body.content;
        callback = req.body.callback;
    }
    session = req.session['user'];
    if(session&&code){
        if(session.code===code){
            add(db,title,type,session.email,content,(result)=>{
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
            result:"用户未登录,请重新登录"
        };
        returnJson(res,result,callback);
    }
});

//delete
router.use('/delete',(req,res)=>{
    let code,session,result = null,email,ID,callback;
    if(req.query.code){
        code = req.query.code;
        ID = req.query.ID;
        callback = req.query.callback;
        email = req.query.email;
    }else if(req.body.code){
        code = req.body.code;
        ID = req.body.ID;
        callback = req.body.callback;
        email = req.body.email;
    }
    session = req.session['user'];
    if(session&&code){
        if(session.code===code){
            deleted(db,ID,session.email,(result)=>{
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
            result:"用户未登录,请重新登录"
        };
        returnJson(res,result,callback);
    }
});

//update

//search
router.get('/search',(req,res)=>{
    let flag,callback,type;
    if(req.query.type){
        flag = req.query.flag;
        type = req.query.type;
        callback =  req.query.callback;
    }
    search(db,flag,type,(result)=>{
        returnJson(res,result,callback);
    });
});

router.get('/college',(req,res)=>{
    let ID,result,code,session,callback;
    if(req.query.ID){
        ID = req.query.ID;
        callback = req.query.callback;
        code = req.query.code;
    }
    session = req.session['user'];
    if(code&&session){
        if(code === session.code){
            college(db,ID,session.email,(result)=>{
                returnJson(res,result,callback);
            });
        }else{
            result = {
                error:true,
                result:'信息验证错误，请重新登录'
            };
            returnJson(res,result,callback);
        }
    }else{
        result = {
            error:true,
            result:'登录已过期，请重新登录'
        };
        returnJson(res,result,callback);
    }
});

router.get('/star',(req,res)=>{
    let ID,result,code,session,callback;
    if(req.query.ID){
        ID = req.query.ID;
        callback = req.query.callback;
        code = req.query.code;
    }
    session = req.session['user'];
    if(code&&session){
        if(code === session.code){
            star(db,ID,session.email,(result)=>{
                returnJson(res,result,callback);
            });
        }else{
            result = {
                error:true,
                result:'信息验证错误，请重新登录'
            };
            returnJson(res,result,callback);
        }
    }else{
        result = {
            error:true,
            result:'登录已过期，请重新登录'
        };
        returnJson(res,result,callback);
    }
});

router.get('/getCollege',(req,res)=>{
    let result,code,session,callback;
    if(req.query.code){
        callback = req.query.callback;
        code = req.query.code;
    }
    session = req.session['user'];
    if(code && session){
        if(code === session.code){
            getCollege(db,session.email,(result)=>{
                returnJson(res,result,callback);
            });
        }else{
            result = {
                error:true,
                result:'信息验证错误，请重新登录'
            };
            returnJson(res,result,callback);
        }
    }else{
        result = {
            error:true,
            result:'登录已过期，请重新登录'
        };
        returnJson(res,result,callback);
    }
});

router.get('/getStar',(req,res)=>{
    let result,code,session,callback;
    if(req.query.code){
        callback = req.query.callback;
        code = req.query.code;
    }
    session = req.session['user'];
    if(code&&session){
        if(code === session.code){
            getStar(db,session.email,(result)=>{
                returnJson(res,result,callback);
            });
        }else{
            result = {
                error:true,
                result:'信息验证错误，请重新登录'
            };
            returnJson(res,result,callback);
        }
    }else{
        result = {
            error:true,
            result:'登录已过期，请重新登录'
        };
        returnJson(res,result,callback);
    }
});

module.exports = router;