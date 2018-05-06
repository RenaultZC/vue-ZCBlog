const crypto = require('crypto');

let md5  = function (str){
    let obj = crypto.createHash('md5');
    obj.update(str);
    return obj.digest('hex');
};
module.exports = md5;