const Chat = require("../models/chatModel");
const GroupMembers = require("../models/groupMemberModel");

exports.createNewChat = async (req, res, next) => {
  try {
    // const sender_id = req.headers.sender_id;
    // const group_id = req.headers.group_id;
    // const message = req.headers.message;
    const { sender_id, group_id, message } = req.body;

    const validUser = await GroupMembers.findOne({
      where: {
        group_id,
        user_id: sender_id,
      },
    });
    if (!validUser) res.json({ message: "Unauthorised" });
    else {
      const reply = await Chat.create({ sender_id, group_id, message });
      res.json(reply);
    }
  } catch (err) {
    console.log("Error while creating chat: ", err);
  }
};

exports.getChats = async (req, res, next) => {
  try {
    const {user_id} = req.user;
    // console.log("\n\n",user_id);
    // console.log('\ninside fetching chats\n',req.headers.group_id);
    const group_id = req.headers.group_id;
    // console.log("\n\n",group_id);
    const validUser = await GroupMembers.findOne({
      where: {
        group_id,
        user_id,
      },
    });
    if (validUser) {
      const chats = await Chat.findAll({ where: { group_id } });
      console.log(chats);
      res.status(201).json({ chats });
    } else res.status(401).json({ message: "Unauthorized" });
  } catch (err) {
    console.log("Error fetching all chats: ", err);
  }
};


