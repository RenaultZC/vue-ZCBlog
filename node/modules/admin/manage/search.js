let search = (db,flag,callback)=>{
    let result = null;
    if(flag==0||falg==1){
        db.query(`SELECT * FROM WHERE flag="${flag}"`,(err,data)=>{
            if(err){
                result = {
                    error:true,
                    result:"数据库查找失败"
                };
            }else{
                if(data.length){
                    result = {
                        error:false,
                        result:data
                    };
                }else{
                    result = {
                        error:true,
                        result:"没有任何用户"
                    };
                }
            }
            callback(result);
        });
    }else{
        db.query(`SELECT * FROM WHERE email="${flag}"`,(err,data)=>{
            if(err){
                result = {
                    error:true,
                    result:"数据库查找失败"
                };
            }else{
                if(data.length){
                    result = {
                        error:false,
                        result:data
                    };
                }else{
                    result = {
                        error:true,
                        result:"没有此用户"
                    };
                }
            }
            callback(result);
        });
    }
};
module.exports = search;