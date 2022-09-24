const messageModel = require("../model/messageModel");

module.exports.addMsg = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await messageModel.create({
      message: { text: message },
      users: [from, to ],
      sender: from,
    });

    if (data) {
      return res.json({ msg: "发送成功" });
    }
    return res.json({ msg: "发送失败" });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllMsg = async (req, res, next) => {
  try {
    const {from , to} = req.body;
    const message = await messageModel.find({
      users: {
        $all: [from, to]
      }
    }).sort({updatedAt: 1})

    const projectMessages = message.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text
      }
    })

    res.json(projectMessages)
  } catch (error) {
    next(error)
  }
};
