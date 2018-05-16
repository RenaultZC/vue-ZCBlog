let add = (db,title,type,author,content,callback)=>{
    let result = null;
    db.query(`INSERT INTO blog(title,type,author,date,content,like) VALUE("${title}","${type}","${author}",NOW(),"${content}")`,(err,data)=>{
       if(err){
           result = {
               error:true,
               result:"数据库出错"
           };
       }else{
           result = {
               error:false,
               result:"博客发表成功"
           };
       }
       callback(result);
    });
};
module.exports = add;