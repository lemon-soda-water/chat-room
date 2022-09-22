// 导入依赖包
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// 创建服务器
const app = express();
// 导入环境变量到process对象上
require('dotenv').config();

// 解决跨域问题
app.use(cors());
// 将请求体转换为json对象
app.use(express.json());

// 连接数据库
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("数据库连接成功");
}).catch(() => {
  console.log("数据库连接失败");
})

// 监听端口
app.listen(process.env.PORT,() => {
  console.log(`服务器启动成功，监听端口号为${process.env.PORT}`);
})