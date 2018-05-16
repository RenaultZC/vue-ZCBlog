let deleted = (db,email,callback)=>{
    let result = null;
    db.query(`DELETE FROM user WHERE email=${email}`,(err,data)=>{
        if(err){
            result = {
                error:true,
                result:"数据库出错"
            };
        }else{
            result = {
                error:false,
                result:"用户删除成功"
            };
        }
        callback(result);
    })
};
module.exports = deleted;