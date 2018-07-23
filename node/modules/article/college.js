let college = (db,ID,email,callback)=>{
    let result,uid,bid;
    db.query(`SELECT blog.ID as bid,user.ID as uid from blog,user WHERE blog.ID=${ID} and user.email="${email}"`,(err,data)=>{
        if(err){
            result = {
                error:true,
                result:'数据库出错'
            };
            callback(result);
        }else{
            if(data.length){
                uid = data[0].uid;
                bid = data[0].bid;
                db.query(`SELECT * FROM collection WHERE bid=${bid} AND uid=${uid}`,(err,data)=>{
                    if(err){
                        result = {
                            error:true,
                            result:'数据库出错'
                        };
                        callback(result);
                    }else{
                        if(data.length){
                            db.query(`DELETE FROM collection WHERE bid=${bid} AND uid=${uid}`,(err,data)=>{
                                if(err){
                                    result = {
                                        error:true,
                                        result:'数据库出错'
                                    };
                                    callback(result);
                                }else{
                                    db.query(`UPDATE user SET Collection=Collection-1 WHERE ID=${uid}`,(err,data)=>{
                                        if(err){
                                            result = {
                                                error:true,
                                                result:'数据库出错'
                                            };
                                            callback(result);
                                        }else{
                                            result = {
                                                error:false,
                                                result:'取消收藏成功'
                                            };
                                            callback(result);
                                        }
                                    });
                                }
                            });
                        }else{
                            db.query(`INSERT INTO collection (uid,bid) VALUES(${uid},${bid})`,(err,data)=>{
                                if(err){
                                    result = {
                                        error:true,
                                        result:'数据库出错'
                                    };
                                    callback(result);
                                }else{
                                    db.query(`UPDATE user SET Collection=Collection+1 WHERE ID=${uid}`,(err,data)=>{
                                        if(err){
                                            result = {
                                                error:true,
                                                result:'数据库出错'
                                            };
                                            callback(result);
                                        }else{
                                            result = {
                                                error:false,
                                                result:'收藏成功'
                                            };
                                            callback(result);
                                        }
                                    });
                                }
                            });
                        }
                    }
                });
            }else{
                result = {
                    error:true,
                    result:'收藏文章不存在请重新操作'
                };
                callback(result);
            }
        }
    });
};
module.exports = college;