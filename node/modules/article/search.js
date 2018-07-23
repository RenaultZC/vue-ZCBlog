let search = (db,flag,type,callback)=>{
    let result = null;
    switch (type){
        case 'email':
            db.query(`SELECT blog.ID,blog.title,blog.date from blog left join user on user.email=blog.author WHERE blog.author="${flag}"`,(err,data)=>{
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
            db.query(`SELECT blog.ID,blog.title,blog.type,blog.date,blog.content,blog.star,blog.view,user.username as author,user.logo from blog left join user on user.email=blog.author ORDER BY ID DESC`,(err,data)=>{
                if(err){
                    result = {
                        error:true,
                        result:err
                    };
                }else{
                    Array.prototype.map.call(data,(item)=>{
                        let reg = /<img[^>]*>/gi;
                        let srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
                        let img = item.content.match(reg);
                        item.img = null;
                        if(img){
                            if(img[0].match(srcReg)){
                                item.img = img[0].match(srcReg)[1];
                            }
                        }
                        let reTag = /<(?:.|\s)*?>/g;
                        item.content = item.content.replace(reTag,"").slice(0,100);
                    });
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
        case 'ID':
            db.query(`SELECT blog.ID,blog.title,blog.type,blog.date,blog.content,blog.star,blog.view,user.username as author,user.logo from blog left join user on user.email=blog.author WHERE blog.ID="${flag}"`,(err,data)=>{
                if(err){
                    result = {
                        error:true,
                        result:err
                    };
                }else{
                    if(data.length){
                        db.query(`UPDATE blog SET view=view+1 WHERE ID=${flag}`);
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
            db.query(`SELECT blog.ID,blog.title,blog.type,blog.date,blog.content,blog.star,blog.view,user.username as author,user.logo from blog left join user on user.email=blog.author WHERE blog.title like "%${flag}" or blog.title like "%${flag}%" or blog.title like "${flag}%" ORDER BY ID DESC`,(err,data)=>{
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