import sendEmail from './sendEmail';
let register = (req,email,password,callback)=>{
    let usernameReg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
    let passwordReg = new RegExp("^(?![\\d]+$)(?![a-zA-Z]+$)(?![^\\da-zA-Z]+$).{6,20}$");
    let result = null;
    //解密
    if(usernameReg.test(username)&&passwordReg.test(password)){
        password = md5(password);
        db.query(`SELECT * from user WHERE email=${email}`,(err,data)=>{
            if(!err && data.length === 0){
                let code = "sig_"+Math.random();
                req.session['validate'] = {
                    email:email,
                    password:password,
                    code:code
                };
                sendEmail(email,code);
                result = {
                    error:false,
                    result:'注册成功请尽快激活邮箱'
                }
            }else if(err){
                result = {
                    error:true,
                    result:'注册失败，数据库出错'
                }
            }else{
                result = {
                    error:true,
                    result:'注册失败，此邮箱已存在'
                }
            }
        });
    }else if(usernameReg.test(username)){
        result = {
            error:true,
            result:'用户名不符合要求请重新输入'
        };
    }else{
        result = {
            error:true,
            result:'密码不符合要求请重新输入'
        };
    }
    callback(result);
};
module.exports = register;