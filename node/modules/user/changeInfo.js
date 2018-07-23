let changeInfo = (db,email,type,value,callback)=>{
    let result;
    switch (type){
        case '0'://username
            db.query(`UPDATE user SET username='${value}' WHERE email='${email}'`,(err,data)=>{
              if(err){
                  result = {
                      error:true,
                      result:'数据库出错'
                  };
              }else{
                  result = {
                      error:false,
                      result:'修改成功'
                  };
              }
              callback(result);
            });
            break;
        case '1'://logo0
            db.query(`UPDATE user SET logo=? WHERE email='${email}'`,value,(err,data)=>{
                if(err){
                    result = {
                        error:true,
                        result:'数据库出错'
                    };
                }else{
                    result = {
                        error:false,
                        result:'修改成功'
                    };
                }
                callback(result);
            });
            break;
    }
};
module.exports = changeInfo;