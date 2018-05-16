let md5 = require("../../md5");
let add = (db,email,password,flag,callback)=>{
    let result = null;
    db.query(`SELECT * FROM user WHERE email="${email}"`,(err,data)=>{
        if(err){
            result = {
                error:true,
                result:"数据库出错"
            };
            callback(result);
        }else{
            if(data.length){
                result = {
                    error:true,
                    result:"用户已存在,请换个邮箱"
                };
                callback(result);
            }else{
                if(flag!=0||flag!=1){
                    flag = 0;
                }
                db.query(`INSERT INTO user (email,password,flag) VALUE("${email}","${passwrod}","${flag}")`,(err,data)=>{
                    if(err){
                        result = {
                            error:true,
                            result:"数据库出错"
                        };
                    }else{
                        result = {
                            error:true,
                            result:(flag==0?"用户":"管理员")+"添加成功"
                        }
                    }
                })
            }
        }
    });
};
module.exports = add;