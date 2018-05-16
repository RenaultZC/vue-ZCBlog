const express = require('express');
let router = express.Router();
const mysql = require('mysql');

let db = mysql.createPool({host:'localhost',user:'web',password:'19980527',database:'blog'});
let returnJson = require("./returnJson");
let add = require("./article/add");
let deleted = require("./article/delete");
let search = require("./article/search");

//add
router.use('/add',(req,res)=>{
    let email,title,type,author,date,content,like,callback,code,session,result;
    if(req.body.code){
        code = req.body.code;
        email = req.body.email;
        title = req.body.title;
        type = req.body.type;
        author = req.body.author;
        content = req.body.content;
        callback = req.body.callback;
    }
    session = req.session[email];
    if(session&&code){
        if(session.code===code){
            add(db,title,type,author,content,(result)=>{
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
    session = req.session[email];
    if(session&&code){
        if(session.code===code){
            deleted(db,session.email,ID,(result)=>{
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

//search
router.use('/search',(req,res)=>{
    let email,code,flag,callback,session,result = null;
    if(req.query.code){
        email =  req.query.email;
        code =  req.query.code;
        flag =  req.query.flag;
        callback =  req.query.callback;
    }
    session = req.session[email];
    if(session && code){
        if(session.code === code){
            if(session.flag == 0){
                flag==1?'0':flag;
            }
            search(db,email,flag,(result)=>{
                returnJson(res,result,callback);
            })
        }else{
            result = {
                error:true,
                result:"用户登录失效"
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

module.exports = router;