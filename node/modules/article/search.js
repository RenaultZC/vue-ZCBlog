let search = (db,email,flag,callback)=>{
    let result = null;
    switch (flag){
        case '0':
            db.query(`SELECT * FROM blog WHERE author="${email}"`,(err,data)=>{
                if(err){
                    result = {
                        error:true,
                        result:"数据库出错"
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
                            result:"还未发布任何博客"
                        };
                    }
                }
                callback(result);
            });
            break;
        case '1':
            db.query(`SELECT * FROM blog"`,(err,data)=>{
                if(err){
                    result = {
                        error:true,
                        result:"数据库出错"
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
                            result:"还未发布任何博客"
                        };
                    }
                }
                callback(result);
            });
            break;
        default:
            db.query(`SELECT * FROM blog WHERE title like "%${flag}" or title like "%${flag}%" or title like "${flag}%"`,(err,data)=>{
                if(err){
                    result = {
                        error:true,
                        result:"数据库出错"
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
                            result:"未找到类似博客"
                        };
                    }
                }
                callback(result);
            });
            break;
    }
};
module.exports = search;