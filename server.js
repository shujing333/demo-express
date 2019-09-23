const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const userRouter = require("./routes/user");
const postRouter = require("./routes/post");
const fileRouter = require("./routes/file");
const settingRouter = require("./routes/setting");
const passwordRouter = require("./routes/password");
const app = express();
//模板引擎
app.set("views", "views");
app.set("view engine", "ejs");

//session中间件处理
app.use(
  session({
    secret: "hsj",
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 2
    }
  })
);

//处理静态资源托管
app.use(express.static("public"));
//处理req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//处理req.cookies
app.use(cookieParser());

//处理各种路由中间件
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/files", fileRouter);
app.use("/settings", settingRouter);
app.use("/settings", passwordRouter);

app.listen(3000);
