let activation = (db,code,validate,callback)=>{
    let result = null;
    let email = validate.email,passwrod = validate.password;
    if(code === validate.code){
        db.query(`INSERT INTO user (email,password,flag) VALUE("${email}","${passwrod}","0")`,(err,data)=>{
            if(err){
                result = {
                    error:true,
                    result:"数据库出错"
                };
            }else{
                result = {
                    error:false,
                    result:"注册成功"
                };
            }
            callback(result);
        });
    }else{
        result = {
            error:true,
            result:"注册码不一致，请勿恶意注册"
        };
        callback(result);
    }
};
module.exports = activation;