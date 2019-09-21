const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const UserModel = require("../models/user");
const auth = require("../middlewares/auth");
const upload = multer({
  dest: "C:/tmp"
});
const router = express.Router();

//个人信息页面
router.get("/profile", auth(), (req, res) => {
  res.render("settings/profile", {
    user: req.session.user
  });
});

//更新个人信息
router.post("/update", auth(), upload.single("avatar"), async (req, res) => {
  //1.要修改的是谁,req.session.user._id
  let id = req.session.user._id;
  let newFileName = "";
  if (req.file) {
    //2.处理文件
    //2.1处理新的文件名字
    let id = req.session.user._id;
    newFileName = new Date().getTime() + "_" + req.file.originalname;
    let newFilePath = path.resolve(
      __dirname,
      `../public/upload/${newFileName}`
    );
    //2.2读文件写文件
    let fileData = fs.readFileSync(req.file.path);
    fs.writeFileSync(newFilePath, fileData);
  }

  //3.更新用户数据库
  let data = {
    username: req.body.username
  };
  if (req.file) {
    data.avatar = `http://localhost:3000/upload/${newFileName}`;
  }
  await UserModel.updateOne({ _id: id }, data);

  //4.更新用户的session
  let user = await UserModel.findById(id);
  //console.log(user);
  req.session.user = user;

  //res.send("修改成功");
  res.redirect("back");
});
module.exports = router;
