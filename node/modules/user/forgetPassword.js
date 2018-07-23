let sendEmail = require("./sendEmail");
let encryption = require("../encryption");

let forgetPassword = (req,db,email,newPassword,callback)=>{
    db.query(`SELECT * from user WHERE email="${email}"`,(err,data)=>{
        let result=null;
        if(err){
            result = {
                error:true,
                result:"数据库出错"
            }
        }else{
            if(data.length){
                newPassword = encryption(newPassword);
                let code = "sig_"+Math.random();
                req.session['user'] = {
                    email:email,
                    code:code
                };
                let link = `http://localhost:8080/#/activation/forgetPassword?code=${code}&email=${email}&newPassword=${newPassword}`;
                sendEmail(email,"更改密码",link);
                result = {
                    error:false,
                    result:'请尽快从邮箱中修改密码'
                };
            }else{
                result = {
                    error:false,
                    result:"此邮箱并未注册 请注册后在进行操作"
                };
            }
        }
        callback(result);
    });
};
module.exports = forgetPassword;