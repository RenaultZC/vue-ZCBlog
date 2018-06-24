let getCollege = (db,email,callback)=>{
    let result;
    db.query(`SELECT ID from user WHERE email="${email}"`,(err,data)=>{
        if(err){
            result = {
                error:true,
                result:'数据库出错'
            };
            callback(result);
        }else{
            db.query(`SELECT blog.ID,blog.title,blog.type,blog.date,blog.content,blog.star,blog.view,user.username as author,user.logo from blog left join user on user.email=blog.author WHERE blog.ID=(SELECT bid as ID from collection WHERE uid="${data[0].ID}")`,(err,data)=>{
                if(err){
                    result = {
                        error:true,
                        result:'数据库出错'
                    };
                    callback(result);
                }else{
                    result = {
                        error:false,
                        result:data
                    };
                    callback(result);
                }
            })
        }
    })
};
module.exports = getCollege;