const mongoose=require('../config/db');
const schema=new mongoose.Schema(
{
    title:String,
    content:String
},
{
    //这个选项可以让每篇文章都会自动携带有创建时间与更新时间
    timestamps:true
}
);
const model=mongoose.model('post',schema);
module.exports=model;