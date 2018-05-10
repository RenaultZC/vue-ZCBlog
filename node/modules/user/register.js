let sendEmail =require('./sendEmail');
let md5 = require('../md5');
let register = (req,db,email,password,callback)=>{
    let usernameReg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
    let passwordReg = new RegExp("^(?![\\d]+$)(?![a-zA-Z]+$)(?![^\\da-zA-Z]+$).{6,20}$");
    let result = null;
    //解密
    if(usernameReg.test(email)&&passwordReg.test(password)){
        password = md5(password);
        db.query(`SELECT * from user WHERE email="${email}"`,(err,data)=>{
            if(!err && data.length === 0){
                let code = "sig_"+Math.random();
                req.session[email] = {
                    email:email,
                    password:password,
                    code:code
                };
                let link = `http://blog.zhangchaoweb.xin/activation?code=${code}&email=${email}`;
                sendEmail(email,"激活账号",link);
                result = {
                    error:false,
                    result:'注册成功请尽快激活邮箱'
                }
            }else if(err){
                result = {
                    error:true,
                    result:err
                }
            }else{
                result = {
                    error:true,
                    result:'注册失败，此邮箱已存在'
                }
            }
            callback(result);
        });
    }else if(usernameReg.test(username)){
        result = {
            error:true,
            result:'用户名不符合要求请重新输入'
        };
        callback(result);
    }else{
        result = {
            error:true,
            result:'密码不符合要求请重新输入'
        };
        callback(result);
    }
};
module.exports = register;