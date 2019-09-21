//user表的model文件

//1.引入mongoose,是已经链接了mongodb的mongoose
const mongoose = require("../config/db");
//2.定义好你要操作的表的数据结构 schema
const schema = new mongoose.Schema({
  //表的数据结构描述
  username: String,
  email: String,
  password: String,
  avatar: {
    type: String,
    default: "http://localhost:3000/tem2.jpg" //默认值
  }
});

//3.生成model
const model = mongoose.model("user", schema);

//4.暴露model
module.exports = model;
