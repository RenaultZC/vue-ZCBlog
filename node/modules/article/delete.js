let deleted = (db,ID,email,callback)=>{
    let result = null;
    db.query(`SELECT * FROM blog WHERE ID="${ID}"`,(err,data)=>{
        if(err){
            result = {
                error:true,
                result:"数据库出错"
            };
            callback(result);
        }else{
            if(data.length){
                if(data[0].author === email){
                    db.query(`DELETE FROM blog WHERE ID="${ID}"`,(err,data)=>{
                        if(err){
                            result = {
                                error:true,
                                result:"数据库出错"
                            };
                        }else{
                            result = {
                                error:false,
                                result:"删除成功"
                            };
                        }
                        callback(result);
                    });
                }else{
                    result = {
                        error:true,
                        result:"你无权操作该文章"
                    };
                    callback(result);
                }
            }else{
                result = {
                    error:true,
                    result:"该文章不存在"
                };
                callback(result);
            }
        }
    });
};
module.exports = deleted;