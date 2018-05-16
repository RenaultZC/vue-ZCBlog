let getInfo = (db,email,calback)=>{
    let result;
    db.query(`SELECT username,email,logo,flag from user WHERE email="${email}"`,(err,data)=>{
        if(err){
            result = {
                error:true,
                result:"数据库出错"
            };
        }else{
            if(data.length === 0){
                result = {
                    error:true,
                    result:"用户不存在"
                };
            }else{
                result = {
                    error:false,
                    result:data[0]
                };
            }
        }
        calback(result);
    });
};
module.exports = getInfo;