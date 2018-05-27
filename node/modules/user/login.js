let md5 = require("../md5");
let login = (req,db,email,password,callback)=>{
    password = md5(password);
    let result;
    db.query(`SELECT * FROM user WHERE email="${email}"`,(err,data)=>{
        if(err){
            result = {
                error:true,
                result:"数据库出错"
            };
        }else{
            if(data.length === 0){
                result = {
                    error:true,
                    false:"用户不存在"
                };
            }else{
                if(password === data[0].password){
                    let code = "sig_"+Math.random();
                    req.session['user'] = {
                        email:email,
                        flag:data[0].flag,
                        code:code
                    };
                    result = {
                        error:false,
                        result:{
                            code:code,
                            flag:data[0].flag
                        }
                    };
                }else{
                    result = {
                        error:true,
                        result:"用户名或者密码不正确"
                    };
                }
            }
        }
        callback(result);
    });
};
module.exports = login;