let md5 = require('../md5');

let updatePassword = (db,email,newPassword,callback)=>{
    newPassword = md5(newPassword);
    db.query(`UPDATE user SET password="${newPassword}" WHERE email="${email}"`,(err,data)=>{
        let result = null;
        if(err){
            result = {
                error:true,
                result:"数据库出错"
            };
            console.log(err);
        }else{
            result = {
                error:false,
                result:"修改成功"
            };
        }
        callback(result);
    });
};
module.exports = updatePassword;