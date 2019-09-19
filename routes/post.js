const express=require('express');
const PostModel=require('../models/post');
const router=express.Router();

router.get('/create',(req,res)=>{
    res.render('posts/create');
});

router.post('/store', async(req,res)=>{
    //1.数据的校验
    if(!req.body.title || !req.body.content){
        res.send('参数有误');
        return;
    }

    //2.直接存储到数据库中去
    let newPost=new PostModel(req.body);
    await newPost.save();
    res.send('新增成功');
})

module.exports=router;