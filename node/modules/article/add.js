let add = (db,title,type,author,content,callback)=>{
    let result = null;
    db.query(`INSERT INTO blog(title,type,author,date,content,star,view) VALUE("${title}","${type}","${author}",NOW(),?,0,0)`,content,(err,data)=>{
       if(err){
           result = {
               error:true,
               result:err
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