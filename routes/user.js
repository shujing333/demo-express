const express = require("express");
const UserModel = require("../models/user");
const bcryptjs = require("bcryptjs");
const router = express.Router();

//注册页面路由
router.get("/create", (req, res) => {
  // res.send('用户注册页面');
  res.render("register");
});

//注册操作路由
router.post("/store", async (req, res) => {
  //1.获取form表单,前端传递过来的参数
  //console.log(req.body);
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  //2.对参数做一些校验
  if (!username || !email || !password) {
    res.send("参数有错误");
    return;
  }

  //3.存储到数据库中
  // new UserModel({
  //     username:username,
  //     email:email,
  //     password:password
  // });

  //数据库的操作都是异步操作
  let data = await UserModel.findOne({ email: req.body.email });
  //console.log(data);
  if (data) {
    //邮箱已经被注册
    res.send("该邮箱已经被注册过");
  } else {
    let user = new UserModel({
      username: req.body.username,
      email: req.body.email,
      password: bcryptjs.hashSync(req.body.password)
    });
    await user.save();
    res.send("注册成功");
  }

  //    .then(data=>{
  //       if(data){
  //           //邮箱已经被注册过了
  //           res.send('该邮箱已被注册过');
  //       } else {
  //         let user=new UserModel(req.body);
  //         user
  //             .save()
  //             .then(()=>{
  //                 //成功
  //                 res.send('注册成功');
  //             }).catch(error=>{
  //                 //失败
  //                 res.send('注册失败');
  //             });

  //};
  //});

  //4.send
  // res.send('注册成功');
});

//登录页面
router.get("/login", (req, res) => {
  let redirect = req.query.redirect || "/posts";
  res.render("login", {
    redirect
  });
});

//登录操作
router.post("/login", async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let redirect = req.body.redirect;
  if (!email || !password) {
    res.send("参数有误");
    return;
  }

  //由于数据库密码加密了,不能直接用两个数据去查询
  let user = await UserModel.findOne({ email: email });
  if (!user) {
    res.send("用户名或密码有误");
    return;
  }

  //密码校验
  let isok = bcryptjs.compareSync(password, user.password);
  if (!isok) {
    res.send("用户名或密码有误");
    return;
  }

  //登录成功,给session添加user
  req.session.user = user;
  res.redirect(redirect);
});

//退出登录
router.post("/logout", (req, res) => {
  //sessin清除
  req.session.destroy();
  //返回到登录页面
  res.redirect("/users/login");
});
module.exports = router;
