const User = require("../model/userModel.js");
const brcypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;

    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) {
      return res.json({ msg: "用户名已经存在", status: false });
    }

    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.json({ msg: "邮箱已经存在", status: false });
    }

    const hashedPassword = await brcypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    // 创建用户，数据库会返回所有信息
    delete user.password;
    return res.json({ status: true, user });
  } catch (error) {
    next(error);
  }
};
