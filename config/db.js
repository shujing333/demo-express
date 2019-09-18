//用来做mongoose链接
//1.引入mongoose
const mongoose=require('mongoose');

//2.定义一个mongodb的链接地址
const url='mongodb://127.0.0.1:27017/express';

//3.使用mongoose模块的connect()去链接
mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true})
//以上这行代码返回一个promise对象
.then(()=>{
    console.log('数据库链接成功');
}).catch((err)=>{
    console.log('数据库链接失败');
    console.log(err);
});
//4.将mongoose暴露出去
module.exports=mongoose;