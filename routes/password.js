const express = require("express");
const bcryptjs = require("bcryptjs");
const auth = require("../middlewares/auth");
const UserMOdel = require("../models/user");
const router = express.Router();

//密码页面
router.get("/password", auth(), (req, res) => {
  res.render("settings/password", {
    user: req.session.user
  });
});

//修改密码
router.post("/uppwd", auth(), async (req, res) => {
  let isok = bcryptjs.compareSync(
    req.body.old_password,
    req.session.user.password
  );
  if (isok) {
    if (req.body.new_password === req.body.new_password_confirmation) {
      req.session.user.password = req.body.new_password;
    } else {
      res.send("两次密码不一样");
    }
  } else {
    res.send("密码错误");
  }
  //1.要修改的是谁? req.session.user._id
  //2.更新数据库
  await UserMOdel.update(
    { _id: req.session.user._id },
    {
      password: bcryptjs.hashSync(req.body.new_password)
    }
  );
  //res.send("修改密码成功");
  res.redirect("/users/login");
});
module.exports = router;
