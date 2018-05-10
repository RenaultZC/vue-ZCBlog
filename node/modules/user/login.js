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
            if(data.lenght === 0){
                result = {
                    error:true,
                    false:"用户不存在"
                };
            }else{
                if(password === data[0].password){
                    result = {
                        error:true,
                        result:"用户名或者密码不正确"
                    };
                }else{
                    let code = "sig_"+Math.random();
                    req.session[email] = {
                        email:email,
                        code:code
                    };
                    result = {
                        error:true,
                        result:code
                    };
                }
            }
        }
        callback(result);
    });
};
module.exports = login;