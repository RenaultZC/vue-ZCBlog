let college = (db,ID,email,callback)=>{
    let result;
    db.query(`SELECT blog.ID as bid,user.ID as uid from blog,user WHERE blog.ID=${ID} and user.email="${email}"`,(err,data)=>{
        if(err){
            result = {
                error:true,
                result:'数据库出错'
            };
            callback(result);
        }else{
            if(data.length){
                db.query(`INSERT INTO collection (uid,bid) VALUES(${data[0].uid},${data[0].bid})`,(err,data)=>{
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
            }else{
                result = {
                    error:true,
                    result:'收藏文章不存在请重新操作'
                };

            }
        }
    });
};
module.exports = college;