let search = (db,email,flag,callback)=>{
    let result = null;
    switch (flag){
        case 'email':
            db.query(`SELECT * FROM blog WHERE author="${email} ORDER BY ID DESC"`,(err,data)=>{
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
        case 'all':
            db.query(`SELECT * FROM blog ORDER BY ID DESC`,(err,data)=>{
                if(err){
                    result = {
                        error:true,
                        result:err
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
            db.query(`SELECT * FROM blog WHERE title like "%${flag}" or title like "%${flag}%" or title like "${flag}%" ORDER BY ID DESC`,(err,data)=>{
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