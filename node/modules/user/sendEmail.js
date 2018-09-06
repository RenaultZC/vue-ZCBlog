const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: "smtp.qq.com",
    port: 465,
    secure: true,
    auth:{
        user:'1073294992@qq.com',
        pass:'moyhebapbtekbcid'
    }
});

let sendEmail = (email,date,link)=>{
    let result = null;
    link = encodeURI(link);
    let mailOptions = {
        from:'1073294992@qq.com',
        to:email,
        subject:date,//标题
        html:`<h2><a href=${link}>点此链接</a>${date}</h2>`
    };
    transporter.sendMail(mailOptions,(err,info)=>{
        if(err){
            result = {
                error:true,
                result:err
            }
        }else{
            result = {
                error:false,
                result:'发送成功'
            }
        }
        transporter.close();
    });
};
module.exports = sendEmail;