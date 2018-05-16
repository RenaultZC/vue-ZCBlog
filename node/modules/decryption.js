let decryption = (secret)=>{
    let password = String.fromCharCode(secret.charCodeAt(0)-secret.length);
    let length = secret.length;
    for(let i = 1;i < length;i++){
        password += String.fromCharCode(secret.charCodeAt(i)-password.charCodeAt(i-1));
    }
    return password;
};
module.exports = decryption;