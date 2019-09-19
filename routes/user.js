const express=require('express');
const UserModel=require('../models/user');
const bcryptjs=require('bcryptjs');
const router=express.Router();

//注册页面路由
router.get('/create',(req,res)=>{
    // res.send('用户注册页面');
    res.render('register');
});

//注册操作路由
router.post('/store', async(req,res)=>{
    //1.获取form表单,前端传递过来的参数
    //console.log(req.body);
    let username=req.body.username;
    let email=req.body.email;
    let password=req.body.password;
    //2.对参数做一些校验
    if(!username || !email || !password){
        res.send('参数有错误');
        return;
    }

    //3.存储到数据库中
    // new UserModel({
    //     username:username,
    //     email:email,
    //     password:password
    // });

    //数据库的操作都是异步操作
    let data=await UserModel.findOne({email:req.body.email})
    //console.log(data);
    if(data){
        //邮箱已经被注册
        res.send('该邮箱已经被注册过');
    }else{
        let user=new UserModel({
            username:req.body.username,
            email:req.body.email,
            password:bcryptjs.hashSync(req.body.password)
        });
        await user.save();
        res.send('注册成功');
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

module.exports=router;
